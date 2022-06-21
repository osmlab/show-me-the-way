"use strict";

var osmStream = require('osm-stream'),
    reqwest = require('reqwest'),
    formatDistance = require('date-fns/formatDistanceStrict'),
    mustache = require('mustache'),
    LRU = require('lru-cache');

var bboxArray = ["-90.0", "-180.0", "90.0", "180.0"];
var mapCenter = [51.505, -0.09];
const maxDiffRetries = 1;
var filteredBbox = false;
var changeset_comment_match = null;
if (location.hash) {
    var parsed_hash = Object.fromEntries(new URLSearchParams(location.hash.replace('#', '')));

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

var bbox = makeBbox(bboxArray);
var bboxString = null;
if (filteredBbox && isBboxSizeAcceptable(bbox)) {
    bboxString = bbox.toBBoxString();
}

var ignore = ['bot-mode'];
const mapboxKey = 'pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqeTBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw';

var map = L.map('map', {
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

var overview_map = L.map('overview_map', {
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

var satellite = new L.TileLayer(
    'https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}', {
    style_id: 'cju35gljt1bpm1fp2z93dlyca',
    key: mapboxKey,
    attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
}).addTo(map);

var osm = new L.TileLayer(
    'https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}', {
    minZoom: 4,
    maxZoom: 8,
    style_id: 'cj8xtgojqhd3z2sorzpi01csj',
    key: mapboxKey,
    attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
}).addTo(overview_map);

var mapElementGroup = L.featureGroup().addTo(map);

var changeset_info = document.getElementById('changeset_info');
var changeset_tmpl = document.getElementById('changeset-template').innerHTML;
var queue = [];
var changeset_cache = LRU(50);

// Remove Leaflet shoutouts
map.attributionControl.setPrefix('');
overview_map.attributionControl.setPrefix('');

changeset_info.innerHTML = '<div class="loading">loading...</div>';

var lastLocation = L.latLng(0, 0);

function isBboxSizeAcceptable(bbox) { // heuristic to fetch
    var width = Math.abs(bbox.getSouthWest().lat - bbox.getNorthEast().lat);
    var height = Math.abs(bbox.getSouthWest().lng - bbox.getNorthEast().lng);
    // A guesstimate of the maximum filtered area size that the server would accept.
    // For larger areas, we fall back to the global (server-cached) change file
    // ...and we process it client-side as usual.
    return (width * height) < 2;
}

function farFromLast(c) {
    try {
        return lastLocation.distanceTo(c) > 1000;
    } finally {
        lastLocation = c;
    }
}

function showLocation(ll) {
    var nominatim_tmpl = '//nominatim.openstreetmap.org/reverse?format=json' +
        '&lat={lat}&lon={lon}&zoom=5';
    reqwest({
        url: nominatim_tmpl.replace('{lat}', ll.lat).replace('{lon}', ll.lng),
        crossOrigin: true,
        type: 'json'
    }, function(resp) {
        document.getElementById('reverse-location').textContent =
            '' + resp.display_name + '';
    });
}

function fetchChangesetData(id, callback) {
    var cached_changeset_data = changeset_cache.get(id);

    if (!cached_changeset_data) {
        var changeset_url_tmpl = '//www.openstreetmap.org/api/0.6/changeset/{id}';
        reqwest({
            url: changeset_url_tmpl.replace('{id}', id),
            crossOrigin: true,
            type: 'xml'
        }, function(resp) {
            var changeset_data = {};
            var tags = resp.getElementsByTagName('tag');
            for (var i = 0; i < tags.length; i++) {
                var key = tags[i].getAttribute('k');
                var value = tags[i].getAttribute('v');
                changeset_data[key] = value;
            }
            changeset_cache.set(id, changeset_data);
            callback(null, changeset_data);
        });
    } else {
        callback(null, cached_changeset_data);
    }
}

function showComment(id) {
    fetchChangesetData(id, function(err, changeset_data) {
        document.getElementById('comment').textContent = changeset_data.comment + ' in ' + changeset_data.created_by;
    });
}

function makeBbox(bounds_array) {
    return new L.LatLngBounds(
        new L.LatLng(bounds_array[0], bounds_array[1]),
        new L.LatLng(bounds_array[2], bounds_array[3])
    );
}

function happenedToday(timestamp) {
    return (new Date(timestamp).toDateString() === new Date().toDateString());
}

function userNotIgnored(change) {
    return (change.old && ignore.indexOf(change.old.user) === -1)
        || (change.neu && ignore.indexOf(change.neu.user) === -1);
}

var runSpeed = 2000;

osmStream.runFn(function(err, data) {
    queue = data.filter(f => {
        var type = (f.old && f.old.type) || (f.neu && f.neu.type);
        switch (type) {
            case 'way':
                var bbox_intersects_old = (f.old && f.old.bounds && bbox.intersects(makeBbox(f.old.bounds)));
                var bbox_intersects_new = (f.neu && f.neu.bounds && bbox.intersects(makeBbox(f.neu.bounds)));
                var happened_today = happenedToday(f.neu && f.neu.timestamp);
                var user_not_ignored = userNotIgnored(f);
                var way_long_enough = (f.old && f.old.linestring && f.old.linestring.length > 4) || (f.neu && f.neu.linestring && f.neu.linestring.length > 4);
                return (bbox_intersects_old || bbox_intersects_new) &&
                    happened_today &&
                    user_not_ignored &&
                    way_long_enough;
            case 'node':
                var has_tags = (f.neu && Object.keys(f.neu.tags || {}).length > 0)
                    || (f.old && Object.keys(f.old.tags || {}).length > 0);
                if (!has_tags) { // shortcut to skip more expensive operations
                    return false;
                }
                var bbox_contains_old = (f.old && f.old.lat && f.old.lon && bbox.contains(new L.LatLng(f.old.lat, f.old.lon)));
                var bbox_contains_new = (f.neu && f.neu.lat && f.neu.lon && bbox.contains(new L.LatLng(f.neu.lat, f.neu.lon)));
                var happened_today = happenedToday(f.neu && f.neu.timestamp);
                var user_not_ignored = userNotIgnored(f);
                return (bbox_contains_old || bbox_contains_new) &&
                    happened_today &&
                    user_not_ignored;
            default:
                return false;
        }
    }).sort(function(a, b) {
        return (+new Date((a.neu && a.neu.timestamp))) -
            (+new Date((b.neu && b.neu.timestamp)));
    });
    // if (queue.length > 2000) queue = queue.slice(0, 2000);
    runSpeed = 1500;
}, null, null, bboxString, maxDiffRetries);

function doDrawMapElement() {
    document.getElementById('queuesize').textContent = queue.length;
    if (queue.length) {
        var change = queue.pop();
        var mapElement = change.neu || change.old;

        // Skip map elements that are part of a changeset we don't care about
        if (changeset_comment_match && mapElement.changeset) {
            fetchChangesetData(mapElement.changeset, function(err, changeset_data) {
                if (err) {
                    console.log("Error filtering changeset: " + err);
                    doDrawMapElement();
                    return;
                }

                if (changeset_data.comment && changeset_data.comment.indexOf(changeset_comment_match) > -1) {
                    console.log("Drawing map element " + mapElement.id);
                    drawMapElement(change, function() {
                        doDrawMapElement();
                    });
                } else {
                    console.log("Skipping map element " + mapElement.id + " because changeset " + mapElement.changeset + " didn't match " + changeset_comment_match);
                    doDrawMapElement();
                }
            });
        } else {
            drawMapElement(change, function() {
                doDrawMapElement();
            });
        }
    } else {
        window.setTimeout(doDrawMapElement, runSpeed);
    }
}

function pruneMapElements() {
    var mb = map.getBounds();
    mapElementGroup.eachLayer(function(l) {
        if (!mb.intersects(l.getBounds())) {
            mapElementGroup.removeLayer(l);
        } else {
            l.setStyle({ opacity: 0.5 });
        }
    });
}

function setTagText(change) {
    var showTags = ['building', 'natural', 'leisure', 'waterway',
        'barrier', 'landuse', 'highway', 'power', 'amenity', 'place',
        'addr:housenumber', 'memorial', 'historic', 'shop', 'office',
        'emergency'];
    var mapElement = change.type === 'delete' ? change.old : change.neu;
    var tags = mapElement.tags;
    for (var i = 0; i < showTags.length; i++) {
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

    var past_tense = { modify: 'modified', create: 'created', 'delete': 'deleted' };
    var mapElement = change.type === 'delete' ? change.old : change.neu;
    change.meta = {
        action: past_tense[change.type],
        id: mapElement.id,
        type: mapElement.type,
        // Always pull in the new side user, timestamp, and changeset info
        user: change.neu.user,
        changeset: change.neu.changeset
    };

    // Zoom to the area in question
    var bounds = mapElement.type === 'way'
        ? makeBbox(mapElement.bounds)
        : makeBbox([mapElement.lat, mapElement.lon, mapElement.lat, mapElement.lon]);

    if (farFromLast(bounds.getCenter())) showLocation(bounds.getCenter());
    showComment(change.neu.changeset);

    change.timetext = formatDistance(new Date(change.neu.timestamp), new Date(), {
        addSuffix: true
    })

    map.fitBounds(bounds);
    overview_map.panTo(bounds.getCenter());
    changeset_info.innerHTML = mustache.render(changeset_tmpl, setTagText(change));

    var color = { 'create': '#B7FF00', 'modify': '#FF00EA', 'delete': '#FF0000' }[change.type];
    switch (mapElement.type) {
        case 'way':
            var newLine;
            if (mapElement.tags.building || mapElement.tags.area) {
                newLine = L.polygon([], {
                    opacity: 1,
                    color: color,
                    fill: color
                }).addTo(mapElementGroup);
            } else {
                newLine = L.polyline([], {
                    opacity: 1,
                    color: color
                }).addTo(mapElementGroup);
            }
            // This is a bit lower than 3000 because we want the whole way
            // to stay on the screen for a bit before moving on.
            var perPt = runSpeed / mapElement.linestring.length;

            function drawPt(pt) {
                newLine.addLatLng(pt);
                if (mapElement.linestring.length) {
                    window.setTimeout(function() {
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
            var radii = [];
            for (var i = 0; i <= 25; i += 1) {
                radii.push(17 * Math.sin(i / 10));
            }
            var newMarker = L.circleMarker([mapElement.lat, mapElement.lon], {
                opacity: 1,
                color: color
            }).addTo(mapElementGroup);

            var perRadius = runSpeed / radii.length;
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
