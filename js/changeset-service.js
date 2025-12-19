import { LRUCache } from 'lru-cache';
import { fetchWithRetry } from './utils';

const STORAGE_KEY = 'smtw-changesets';
const MAX_SIZE = 500;
const PERSIST_INTERVAL_MS = 30000;

class ChangesetService {
    constructor() {
        this.cache = this.loadFromStorage();
        this.inFlight = new Map(); // Track pending requests to avoid duplicates
        this.persistIntervalId = null;
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const cache = new LRUCache({ max: MAX_SIZE });
                cache.load(JSON.parse(stored));
                console.log(`[ChangesetService] Loaded ${cache.size} entries from cache`);
                return cache;
            }
        } catch (err) {
            console.warn('[ChangesetService] Failed to load cache:', err.message);
        }
        return new LRUCache({ max: MAX_SIZE });
    }

    saveToStorage() {
        // Defer to idle time to avoid blocking UI
        const doSave = () => {
            try {
                const data = JSON.stringify(this.cache.dump());
                localStorage.setItem(STORAGE_KEY, data);
                console.log(`[ChangesetService] Saved ${this.cache.size} entries to cache`);
            } catch (err) {
                console.warn('[ChangesetService] Failed to save cache:', err.message);
            }
        };

        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(doSave, { timeout: 10000 });
        } else {
            setTimeout(doSave, 0);
        }
    }

    saveToStorageSync() {
        // Synchronous version for beforeunload (can't use async there)
        try {
            const data = JSON.stringify(this.cache.dump());
            localStorage.setItem(STORAGE_KEY, data);
        } catch (err) {
            // Ignore errors on unload
        }
    }

    startPersisting() {
        if (this.persistIntervalId) return;

        this.persistIntervalId = setInterval(() => this.saveToStorage(), PERSIST_INTERVAL_MS);
        window.addEventListener('beforeunload', () => this.saveToStorageSync());
    }

    stopPersisting() {
        if (this.persistIntervalId) {
            clearInterval(this.persistIntervalId);
            this.persistIntervalId = null;
        }
    }

    /**
     * Get changeset data by ID
     * @param {number} id - Changeset ID
     * @returns {Promise<Object>} Changeset tags/metadata
     */
    async get(id) {
        const cached = this.cache.get(id);
        if (cached) {
            console.log(`[ChangesetService] Cache hit for changeset ${id}`);
            return cached;
        }

        // Check if request is already in flight
        if (this.inFlight.has(id)) {
            console.log(`[ChangesetService] Waiting for in-flight request for changeset ${id}`);
            return this.inFlight.get(id);
        }

        console.log(`[ChangesetService] Cache miss, fetching changeset ${id}`);

        // Create and track the fetch promise
        const fetchPromise = this.fetchChangeset(id);
        this.inFlight.set(id, fetchPromise);

        try {
            const result = await fetchPromise;
            return result;
        } finally {
            this.inFlight.delete(id);
        }
    }

    async fetchChangeset(id) {
        const response = await fetchWithRetry(
            `//www.openstreetmap.org/api/0.6/changeset/${id}`,
            { mode: 'cors' },
            { timeout: 5000, retries: 2 }
        );
        const responseString = await response.text();
        const data = new window.DOMParser()
            .parseFromString(responseString, 'text/xml');

        const changesetData = {};
        const tags = data.getElementsByTagName('tag');

        for (let i = 0; i < tags.length; i++) {
            const key = tags[i].getAttribute('k');
            const value = tags[i].getAttribute('v');
            changesetData[key] = value;
        }

        this.cache.set(id, changesetData);
        return changesetData;
    }
}

export { ChangesetService };

