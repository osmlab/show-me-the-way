import { LRUCache } from 'lru-cache';
import { fetchWithRetry, distanceBetween } from './utils';

const STORAGE_KEY = 'smtw-geocodes';
const MAX_SIZE = 2000;
const PERSIST_INTERVAL_MS = 30000;
const CLOSE_THRESHOLD_METERS = 10000;

class GeocodeService {
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
                console.log(`[GeocodeService] Loaded ${cache.size} entries from cache`);
                return cache;
            }
        } catch (err) {
            console.warn('[GeocodeService] Failed to load cache:', err.message);
        }
        return new LRUCache({ max: MAX_SIZE });
    }

    saveToStorage() {
        // Defer to idle time to avoid blocking UI
        const doSave = () => {
            try {
                const data = JSON.stringify(this.cache.dump());
                localStorage.setItem(STORAGE_KEY, data);
                console.log(`[GeocodeService] Saved ${this.cache.size} entries to cache`);
            } catch (err) {
                console.warn('[GeocodeService] Failed to save cache:', err.message);
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
     * Find a cached geocode within threshold distance
     */
    findNearbyCache(lat, lon) {
        const closeByKey = [...this.cache.keys()].find((key) => {
            const [cachedLat, cachedLon] = key.split(',').map(parseFloat);
            return distanceBetween(lat, lon, cachedLat, cachedLon) < CLOSE_THRESHOLD_METERS;
        });

        if (closeByKey) {
            return this.cache.get(closeByKey);
        }
        return null;
    }

    /**
     * Get display name for a location
     * @param {Object} boundsCenter - Object with lat and lng properties
     * @returns {Promise<string|null>} Display name or null on failure
     */
    async get(boundsCenter) {
        const lat = boundsCenter.lat;
        const lon = boundsCenter.lng;
        const key = `${lat.toFixed(2)},${lon.toFixed(2)}`; // Round to ~1.1km resolution

        // Check for exact cache hit (includes cached failures as null)
        if (this.cache.has(key)) {
            const cached = this.cache.get(key);
            console.log(`[GeocodeService] Cache hit for ${key}: ${cached ? 'found' : 'cached failure'}`);
            return cached;
        }

        // Check for nearby cached result (only for successful lookups)
        const nearbyCached = this.findNearbyCache(lat, lon);
        if (nearbyCached) {
            console.log(`[GeocodeService] Cache hit (nearby) for ${key}`);
            return nearbyCached;
        }

        // Check if request is already in flight
        if (this.inFlight.has(key)) {
            console.log(`[GeocodeService] Waiting for in-flight request for ${key}`);
            return this.inFlight.get(key);
        }

        console.log(`[GeocodeService] Cache miss, fetching ${key}`);

        // Create and track the fetch promise
        const fetchPromise = this.fetchGeocode(lat, lon);
        this.inFlight.set(key, fetchPromise);

        try {
            const result = await fetchPromise;
            return result;
        } finally {
            this.inFlight.delete(key);
        }
    }

    async fetchGeocode(lat, lon) {
        // Use reduced precision for the request (matches cache key)
        const roundedLat = lat.toFixed(2);
        const roundedLon = lon.toFixed(2);
        const nominatimUrl = `//nominatim.openstreetmap.org/reverse`
            + `?format=json&lat=${roundedLat}&lon=${roundedLon}&zoom=5`;

        try {
            const response = await fetchWithRetry(
                nominatimUrl,
                { mode: 'cors' },
                { timeout: 3000, retries: 1 } // 3s timeout, max 2 attempts total
            );
            const data = await response.json();
            const id = `${roundedLat},${roundedLon}`;
            const displayName = data.display_name;
            this.cache.set(id, displayName);
            return displayName;
        } catch (err) {
            console.warn('[GeocodeService] Failed to fetch location after retries:', err.message);
            // Cache the failure so we don't retry the same coords repeatedly
            const id = `${roundedLat},${roundedLon}`;
            this.cache.set(id, null);
            return null; // Graceful fallback
        }
    }
}

export { GeocodeService };

