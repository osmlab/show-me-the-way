import osmStream from 'osm-stream';

const DB_NAME = 'smtw-diffs';
const STORE_NAME = 'diffs';
const MAX_STORED_ENTRIES = 10;
const TTL_MS = 10 * 60 * 1000; // 10 minutes
const CULL_INTERVAL_MS = 60 * 1000; // 1 minute
const MAX_RETRIES = 2;

class DiffService {
    constructor() {
        this.cullIntervalId = null;
        this.streamHandle = null;
        this.db = null;
        this.memoryCache = []; // In-memory cache for sync access
    }

    async init() {
        await this.openDatabase();
        await this.loadFromDB();
    }

    openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, 1);

            request.onerror = () => {
                console.warn('[DiffService] Failed to open IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('[DiffService] IndexedDB opened');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'key' });
                    console.log('[DiffService] Created IndexedDB store');
                }
            };
        });
    }

    async loadFromDB() {
        if (!this.db) return;

        return new Promise((resolve) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                this.memoryCache = request.result || [];
                if (this.memoryCache.length) {
                    console.log(`[DiffService] Loaded ${this.memoryCache.length} entries from IndexedDB`);
                }
                resolve();
            };

            request.onerror = () => {
                console.warn('[DiffService] Failed to load from IndexedDB:', request.error);
                resolve();
            };
        });
    }

    async saveToDB(entries) {
        if (!this.db) return;

        return new Promise((resolve) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            // Clear and rewrite all entries
            store.clear();
            for (const entry of entries) {
                store.put(entry);
            }

            transaction.oncomplete = () => {
                console.log(`[DiffService] Saved ${entries.length} entries to IndexedDB`);
                resolve();
            };

            transaction.onerror = () => {
                console.warn('[DiffService] Failed to save to IndexedDB:', transaction.error);
                resolve();
            };
        });
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
     * Get all valid (non-expired) cached diff data (sync, from memory)
     */
    getCached() {
        const now = Date.now();

        const validEntries = this.memoryCache.filter((entry) => {
            const entryTime = new Date(entry.key).getTime();
            return (now - entryTime) < TTL_MS;
        });

        if (validEntries.length) {
            console.log(`[DiffService] Found ${validEntries.length} valid cached diffs`);
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

        // Don't cache if already exists
        if (this.memoryCache.some((e) => e.key === key)) return;

        // Add new entry
        this.memoryCache.push({ key, data });

        // Keep only last N entries
        if (this.memoryCache.length > MAX_STORED_ENTRIES) {
            this.memoryCache = this.memoryCache.slice(-MAX_STORED_ENTRIES);
        }

        console.log(`[DiffService] Cached diff with key ${key}, total entries: ${this.memoryCache.length}`);

        // Persist to IndexedDB in background
        this.saveToDB(this.memoryCache);
    }

    /**
     * Remove expired entries (older than TTL)
     */
    cull() {
        const now = Date.now();
        const before = this.memoryCache.length;

        this.memoryCache = this.memoryCache.filter((entry) => {
            const entryTime = new Date(entry.key).getTime();
            return (now - entryTime) < TTL_MS;
        });

        if (this.memoryCache.length !== before) {
            console.log(`[DiffService] Culled ${before - this.memoryCache.length} expired diffs`);
            this.saveToDB(this.memoryCache);
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
