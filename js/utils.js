export function makeBbox(bounds_array) {
    return new L.LatLngBounds(
        new L.LatLng(bounds_array[0], bounds_array[1]),
        new L.LatLng(bounds_array[2], bounds_array[3])
    );
}

export function makeBboxString(bbox) {
    return bbox.toBBoxString();
}

export function isBboxSizeAcceptable(bbox) { // heuristic to fetch
    const width = Math.abs(bbox.getSouthWest().lat - bbox.getNorthEast().lat);
    const height = Math.abs(bbox.getSouthWest().lng - bbox.getNorthEast().lng);
    // A guesstimate of the maximum filtered area size that the server would accept.
    // For larger areas, we fall back to the global (server-cached) change file
    // ...and we process it client-side as usual.
    return (width * height) < 2;
}
