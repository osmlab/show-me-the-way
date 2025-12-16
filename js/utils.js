export function makeBbox(boundsArray) {
    // Input format varies:
    // - OSM stream ways: [maxlat, maxlon, minlat, minlon] = [north, east, south, west]  
    // - URL params: [south, west, north, east]
    // - Nodes: [lat, lon, lat, lon]
    // So we just find min/max to handle any format (like Leaflet did)
    const lat1 = Number(boundsArray[0]);
    const lng1 = Number(boundsArray[1]);
    const lat2 = Number(boundsArray[2]);
    const lng2 = Number(boundsArray[3]);
    
    const south = Math.min(lat1, lat2);
    const north = Math.max(lat1, lat2);
    const west = Math.min(lng1, lng2);
    const east = Math.max(lng1, lng2);
    
    return new maplibregl.LngLatBounds(
        [west, south], // sw
        [east, north]  // ne
    );
}

export function makeBboxString(bbox) {
    // Returns "west,south,east,north" format for API requests
    return `${bbox.getWest()},${bbox.getSouth()},${bbox.getEast()},${bbox.getNorth()}`;
}

export function isBboxSizeAcceptable(bbox) {
    const width = Math.abs(bbox.getSouth() - bbox.getNorth());
    const height = Math.abs(bbox.getWest() - bbox.getEast());
    // A guesstimate of the maximum filtered area size that the server would accept.
    // For larger areas, we fall back to the global (server-cached) change file
    // ...and we process it client-side as usual.
    return (width * height) < 2;
}

/**
 * Calculate distance between two points in meters (Haversine formula)
 */
export function distanceBetween(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Fetch with timeout and retry logic
 * @param {string} url - URL to fetch
 * @param {Object} options - fetch options (mode, headers, etc.)
 * @param {Object} config - retry configuration
 * @param {number} config.timeout - request timeout in ms (default: 5000)
 * @param {number} config.retries - number of retries (default: 2)
 * @param {number} config.backoff - base backoff time in ms (default: 1000)
 * @returns {Promise<Response>} - fetch response
 */
export async function fetchWithRetry(url, options = {}, config = {}) {
    const { timeout = 5000, retries = 2, backoff = 1000 } = config;

    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;
        } catch (err) {
            clearTimeout(timeoutId);
            if (attempt === retries) throw err;
            // Exponential backoff: 1s, 2s, 3s...
            await new Promise((r) => setTimeout(r, backoff * (attempt + 1)));
        }
    }
}
