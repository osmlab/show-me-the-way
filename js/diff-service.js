import osmStream from 'osm-stream';

const STORAGE_KEY = 'smtw-diffs';
const MAX_STORED_ENTRIES = 10;
const TTL_MS = 10 * 60 * 1000; // 10 minutes
const CULL_INTERVAL_MS = 60 * 1000; // 1 minute
const MAX_RETRIES = 2;

class DiffService {
    constructor() {
        this.cullIntervalId = null;
        this.streamHandle = null;
    }

    start(onData, bbox = null) {
        // Start periodic culling
        if (!this.cullIntervalId) {
            this.cullIntervalId = setInterval(() => this.cull(), CULL_INTERVAL_MS);
        }

        // Start osm-stream
        this.streamHandle = osmStream.runFn((err, data) => {
            // Cache the raw diff data
            this.add(data);

            // Pass to callback
            onData(data);
        }, null, null, bbox, MAX_RETRIES);
    }

    stop() {
        if (this.cullIntervalId) {
            clearInterval(this.cullIntervalId);
            this.cullIntervalId = null;
        }

        if (this.streamHandle) {
            this.streamHandle.cancel();
            this.streamHandle = null;
        }
    }

    /**
     * Get all valid (non-expired) cached diff data
     */
    getCached() {
        const now = Date.now();
        const entries = this.load();

        const validEntries = entries.filter((entry) => {
            const entryTime = new Date(entry.key).getTime();
            return (now - entryTime) < TTL_MS;
        });

        if (validEntries.length) {
            console.log(`Found ${validEntries.length} valid cached diffs`);
        }

        return validEntries.flatMap((entry) => entry.data);
    }

    /**
     * Cache a new diff
     */
    add(data) {
        if (!data || !data.length) return;

        const key = this.getTimestamp(data);
        if (!key) return;

        let entries = this.load();

        // Don't cache if already exists
        if (entries.some((e) => e.key === key)) return;

        // Add new entry
        entries.push({ key, data });

        // Keep only last N entries
        if (entries.length > MAX_STORED_ENTRIES) {
            entries = entries.slice(-MAX_STORED_ENTRIES);
        }

        this.save(entries);
        console.log(`Cached diff with key ${key}, total entries: ${entries.length}`);
    }

    /**
     * Remove expired entries (older than TTL)
     */
    cull() {
        const now = Date.now();
        let entries = this.load();
        const before = entries.length;

        entries = entries.filter((entry) => {
            const entryTime = new Date(entry.key).getTime();
            return (now - entryTime) < TTL_MS;
        });

        if (entries.length !== before) {
            this.save(entries);
            console.log(`Culled ${before - entries.length} expired diffs`);
        }
    }

    /**
     * Load all cached entries from localStorage
     */
    load() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const entries = JSON.parse(stored);
                console.log(`[DiffService] Loaded ${entries.length} entries from cache`);
                return entries;
            }
        } catch (err) {
            console.warn('[DiffService] Failed to load cache:', err.message);
        }
        return [];
    }

    /**
     * Save entries to localStorage
     */
    save(entries) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
            console.log(`[DiffService] Saved ${entries.length} entries to cache`);
        } catch (err) {
            console.warn('[DiffService] Failed to save cache:', err.message);
        }
    }

    /**
     * Get timestamp from first item in diff data
     * Uses timestamp because osm-stream doesn't include the state file used
     */
    getTimestamp(data) {
        const firstItem = data[0];
        if (firstItem && firstItem.neu && firstItem.neu.timestamp) {
            return firstItem.neu.timestamp;
        }
        return null;
    }
}

export { DiffService };
