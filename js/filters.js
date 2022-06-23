import { makeBbox } from './utils';

export function happenedToday(change) {
    return change.neu && (
        new Date(change.neu.timestamp).toDateString() ===
        new Date().toDateString()
    );
}

export function userNotIgnored(change) {
    const ignore = ['bot-mode'];
    return (change.old && ignore.indexOf(change.old.user) === -1)
        || (change.neu && ignore.indexOf(change.neu.user) === -1);
}

export function wayLongEnough(change) {
    const type = (change.old && change.old.type) || (change.neu && change.neu.type);
    if (type !== 'way') return true;

    return (change.old && change.old.linestring && change.old.linestring.length > 4)
        || (change.neu && change.neu.linestring && change.neu.linestring.length > 4);
}

export function acceptableType(change) {
    return (change.old && change.old.type)
        || (change.neu && change.neu.type) !== 'relation';
}

export function withinBbox(change, bbox) {
    const c = change;
    const type = (c.old && c.old.type) || (c.neu && c.neu.type);
    let within = false;

    if (type == 'way') {
        const bbox_intersects_old = (c.old && c.old.bounds && bbox.intersects(makeBbox(c.old.bounds)));
        const bbox_intersects_new = (c.neu && c.neu.bounds && bbox.intersects(makeBbox(c.neu.bounds)));
        within = (bbox_intersects_old || bbox_intersects_new);
    } else if (type == 'node') {
        const bbox_contains_old = (c.old && c.old.lat && c.old.lon && bbox.contains(new L.LatLng(c.old.lat, c.old.lon)));
        const bbox_contains_new = (c.neu && c.neu.lat && c.neu.lon && bbox.contains(new L.LatLng(c.neu.lat, c.neu.lon)));
        within = (bbox_contains_old || bbox_contains_new);
    } else {
        console.error('no bbox check for this geometry type');
    }

    return within;
}

export function hasTags(change) {
    return (change.neu && Object.keys(change.neu.tags || {}).length > 0) 
        || (change.old && Object.keys(change.old.tags || {}).length > 0);
}
