"use strict";

import osmStream from 'osm-stream';
import { formatDistanceStrict } from 'date-fns';
import { render } from 'mustache';
import LRU from 'lru-cache';

import { makeBbox, isBboxSizeAcceptable } from './utils';
import { happenedToday, userNotIgnored, acceptableType, hasTags, wayLongEnough,
    withinBbox
} from './filters';

let bboxArray = ["-90.0", "-180.0", "90.0", "180.0"];
const mapCenter = [51.505, -0.09];
const maxDiffRetries = 1;
let filteredBbox = false;
let changeset_comment_match = null;

if (location.hash) {
    const parsed_hash = Object.fromEntries(new URLSearchParams(location.hash.replace('#', '')));

    if (parsed_hash.length === 1 && parsed_hash[Object.keys(parsed_hash)[0]] === null) {
        // To be backwards compatible with pages that assumed the only
        // item in the hash would be the bbox
        bboxArray = Object.keys(parsed_hash)[0].split(',');
    } else {
        if (parsed_hash.bounds) {
            bboxArray = parsed_hash.bounds.split(',');
            filteredBbox = true;
        }
        if (parsed_hash.comment) {
            changeset_comment_match = parsed_hash.comment;
            document.title += ' #' + changeset_comment_match;
        }
    }
}

const bbox = makeBbox(bboxArray);
const bboxString = null;

if (filteredBbox && isBboxSizeAcceptable(bbox)) {
    bboxString = bbox.toBBoxString();
}

const mapboxKey = 'pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqeTBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw';

const map = L.map('map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false
});

if (filteredBbox) {
    map.fitBounds(bbox);
} else {
    map.setView(mapCenter, 13);
}

const overview_map = L.map('overview_map', {
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    minZoom: 4,
    maxZoom: 8
});

if (filteredBbox) {
    overview_map.fitBounds(bbox);
} else {
    overview_map.setView(mapCenter, 4);
}

const satellite = new L.TileLayer(
    'https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}', {
    style_id: 'cju35gljt1bpm1fp2z93dlyca',
    key: mapboxKey,
    attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
}).addTo(map);

const osm = new L.TileLayer(
    'https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}', {
    minZoom: 4,
    maxZoom: 8,
    style_id: 'cj8xtgojqhd3z2sorzpi01csj',
    key: mapboxKey,
    attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
}).addTo(overview_map);

const mapElementGroup = L.featureGroup().addTo(map);

const changeset_info = document.getElementById('changeset_info');
const changeset_tmpl = document.getElementById('changeset-template').innerHTML;
let queue = [];
const changeset_cache = LRU(50);

// Remove Leaflet shoutouts
map.attributionControl.setPrefix('');
overview_map.attributionControl.setPrefix('');

changeset_info.innerHTML = '<div class="loading">loading...</div>';

let lastLocation = L.latLng(0, 0);

function farFromLast(c) {
    try {
        return lastLocation.distanceTo(c) > 1000;
    } finally {
        lastLocation = c;
    }
}

function showLocation(ll) {
    const nominatim_tmpl = '//nominatim.openstreetmap.org/reverse?format=json' +
        '&lat={lat}&lon={lon}&zoom=5';
    fetch(nominatim_tmpl.replace('{lat}', ll.lat).replace('{lon}', ll.lng), {
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('reverse-location').textContent = data.display_name;
    }).catch(err => {
        console.error('Error fetching location', err);
    });
}

function fetchChangesetData(id, callback) {
    const cached_changeset_data = changeset_cache.get(id);

    if (!cached_changeset_data) {
        const changeset_url_tmpl = '//www.openstreetmap.org/api/0.6/changeset/{id}';

        fetch(changeset_url_tmpl.replace('{id}', id), {
            mode: 'cors'
        })
        .then(response => response.text())
        .then(responseString => new window.DOMParser().parseFromString(responseString, "text/xml"))
        .then(data => {
            const changeset_data = {};
            const tags = data.getElementsByTagName('tag');
            for (let i = 0; i < tags.length; i++) {
                const key = tags[i].getAttribute('k');
                const value = tags[i].getAttribute('v');
                changeset_data[key] = value;
            }
            changeset_cache.set(id, changeset_data);
            callback(null, changeset_data);
        })
        .catch(err => {
            console.log('Error fetching changeset data', err);
        });
    } else {
        callback(null, cached_changeset_data);
    }
}

function showComment(id) {
    fetchChangesetData(id, (err, changeset_data) => {
        document.getElementById('comment').textContent = (
            changeset_data.comment + ' in ' + changeset_data.created_by
        );
    });
}

let runSpeed = 2000;

osmStream.runFn((err, data) => {
    queue = data
        .filter(happenedToday)
        .filter(userNotIgnored)
        .filter(acceptableType)
        .filter(hasTags)
        .filter(wayLongEnough)
        .filter(change => withinBbox(change, bbox))
        .sort((a, b) => {
            return (+new Date((a.neu && a.neu.timestamp)))
                - (+new Date((b.neu && b.neu.timestamp)));
        });
    // if (queue.length > 2000) queue = queue.slice(0, 2000);
    runSpeed = 1500;
}, null, null, bboxString, maxDiffRetries);

function doDrawMapElement() {
    document.getElementById('queuesize').textContent = queue.length;
    if (queue.length) {
        const change = queue.pop();
        const mapElement = change.neu || change.old;

        // Skip map elements that are part of a changeset we don't care about
        if (changeset_comment_match && mapElement.changeset) {
            fetchChangesetData(mapElement.changeset, (err, changeset_data) => {
                if (err) {
                    console.log("Error filtering changeset: " + err);
                    doDrawMapElement();
                    return;
                }

                if (changeset_data.comment && changeset_data.comment.indexOf(changeset_comment_match) > -1) {
                    console.log("Drawing map element " + mapElement.id);
                    drawMapElement(change, () => {
                        doDrawMapElement();
                    });
                } else {
                    console.log(
                        "Skipping map element " + mapElement.id
                        + " because changeset " + mapElement.changeset
                        + " didn't match " + changeset_comment_match
                    );
                    doDrawMapElement();
                }
            });
        } else {
            drawMapElement(change, () => {
                doDrawMapElement();
            });
        }
    } else {
        window.setTimeout(doDrawMapElement, runSpeed);
    }
}

function pruneMapElements() {
    const mb = map.getBounds();
    mapElementGroup.eachLayer((l) => {
        const bounds = 'getBounds' in l ? l.getBounds() : l.getLatLng().toBounds(10);

        if (!mb.intersects(bounds)) {
            mapElementGroup.removeLayer(l);
        } else {
            l.setStyle({ opacity: 0.5 });
        }
    });
}

function setTagText(change) {
    const showTags = ['building', 'natural', 'leisure', 'waterway',
        'barrier', 'landuse', 'highway', 'power', 'amenity', 'place',
        'addr:housenumber', 'memorial', 'historic', 'shop', 'office',
        'emergency'];
    const mapElement = change.type === 'delete' ? change.old : change.neu;
    const tags = mapElement.tags;
    for (let i = 0; i < showTags.length; i++) {
        if (tags[showTags[i]]) {
            change.tagtext = showTags[i] + '=' + tags[showTags[i]];
            return change;
        }
    }
    change.tagtext = 'a ' + mapElement.type;
    return change;
}

function drawMapElement(change, cb) {
    pruneMapElements();

    const past_tense = { modify: 'modified', create: 'created', 'delete': 'deleted' };
    const mapElement = change.type === 'delete' ? change.old : change.neu;
    change.meta = {
        action: past_tense[change.type],
        id: mapElement.id,
        type: mapElement.type,
        // Always pull in the new side user, timestamp, and changeset info
        user: change.neu.user,
        changeset: change.neu.changeset
    };

    // Zoom to the area in question
    const bounds = mapElement.type === 'way'
        ? makeBbox(mapElement.bounds)
        : makeBbox([mapElement.lat, mapElement.lon, mapElement.lat, mapElement.lon]);

    if (farFromLast(bounds.getCenter())) showLocation(bounds.getCenter());
    showComment(change.neu.changeset);

    change.timetext = formatDistanceStrict(new Date(change.neu.timestamp), new Date(), {
        addSuffix: true
    })

    map.fitBounds(bounds);
    overview_map.panTo(bounds.getCenter());
    changeset_info.innerHTML = render(changeset_tmpl, setTagText(change));

    const color = { 'create': '#B7FF00', 'modify': '#FF00EA', 'delete': '#FF0000' }[change.type];
    switch (mapElement.type) {
        case 'way':
            let newLine;
            if (mapElement.tags.building || mapElement.tags.area) {
                newLine = L.polygon([], {
                    opacity: 1,
                    color: color,
                    fill: color,
                    weight: 5
                }).addTo(mapElementGroup);
            } else {
                newLine = L.polyline([], {
                    opacity: 1,
                    color: color,
                    weight: 5
                }).addTo(mapElementGroup);
            }
            // This is a bit lower than 3000 because we want the whole way
            // to stay on the screen for a bit before moving on.
            const perPt = runSpeed / mapElement.linestring.length;

            function drawPt(pt) {
                newLine.addLatLng(pt);
                if (mapElement.linestring.length) {
                    window.setTimeout(() => {
                        drawPt(mapElement.linestring.pop());
                    }, perPt);
                } else {
                    window.setTimeout(cb, perPt * 2);
                }
            }

            newLine.addLatLng(mapElement.linestring.pop());
            drawPt(mapElement.linestring.pop());
            break;
        case 'node':
            // Calculate marker radii such that final radius is ~10px
            const radii = [];
            for (let i = 0; i <= 25; i += 1) {
                radii.push(17 * Math.sin(i / 10));
            }
            const newMarker = L.circleMarker([mapElement.lat, mapElement.lon], {
                opacity: 1,
                color: color,
                weight: 5
            }).addTo(mapElementGroup);

            const perRadius = runSpeed / radii.length;
            function nodeMarkerAnimation() {
                newMarker.setRadius(radii.shift());
                if (radii.length) {
                    window.setTimeout(nodeMarkerAnimation, perRadius);
                }
                else {
                    window.setTimeout(cb, perRadius * 2);
                }
            }

            nodeMarkerAnimation();
            break;
    }
}

doDrawMapElement();
