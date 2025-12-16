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
