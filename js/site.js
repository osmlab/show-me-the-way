var osmStream = require('osm-stream'),
    reqwest = require('reqwest'),
    moment = require('moment'),
    _ = require('underscore');

var bboxString = ["-90.0", "-180.0", "90.0", "180.0"];
if (location.hash) {
    bboxString = location.hash.replace('#', '').split(',');
}

var nominatim_tmpl = 'http://nominatim.openstreetmap.org/reverse?format=json' +
    '&lat={lat}&lon={lon}&zoom=5';

var ignore = ['bot-mode'];

var paused = false,

    BING_KEY = 'Arzdiw4nlOJzRwOz__qailc8NiR31Tt51dN2D7cm57NrnceZnCpgOkmJhNpGoppU',

    map = L.map('map', {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false
    }).setView([51.505, -0.09], 13),

    bing = new L.BingLayer(BING_KEY, 'Aerial').addTo(map),

    overview_map = L.map('overview_map', {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false
    }).setView([51.505, -0.09], 1),

    osm = new L.TileLayer('http://a.tiles.mapbox.com/v3/saman.map-f8nluy8d/{z}/{x}/{y}.jpg70', {
        minZoom: 4,
        maxZoom: 8,
        attribution: '<a href="http://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
    }).addTo(overview_map),

    lineGroup = L.featureGroup().addTo(map),

    changeset_info = document.getElementById('changeset_info'),
    changeset_tmpl = _.template(document.getElementById('changeset-template').innerHTML);

// Remove Leaflet shoutouts
map.attributionControl.setPrefix('');
overview_map.attributionControl.setPrefix('');

var bbox = new L.LatLngBounds(
        new L.LatLng(+bboxString[0], +bboxString[1]),
        new L.LatLng(+bboxString[2], +bboxString[3]));

changeset_info.innerHTML = '<div class="loading">loading...</div>';

var queue = [];

function showLocation(ll) {
    reqwest({
        url: nominatim_tmpl
            .replace('{lat}', ll.lat)
            .replace('{lon}', ll.lng),
        type: 'json'
    }, function(resp) {
        document.getElementById('reverse-location').innerHTML =
            '' + resp.display_name + '';
    });
}

// The number of changes to show per minute
osmStream.runFn(function(err, data) {
    queue = queue.concat(_.filter(data, function(f) {
        return f.neu && f.neu.type === 'way' &&
            (bbox && bbox.intersects(new L.LatLngBounds(
                new L.LatLng(f.neu.bounds[0], f.neu.bounds[1]),
                new L.LatLng(f.neu.bounds[2], f.neu.bounds[3])))) &&
            f.type !== 'delete' && f.neu.linestring &&
            ignore.indexOf(f.neu.user) === -1 &&
            f.neu.linestring.length > 4;
    }));
});

function doDrawWay() {
    if (queue.length) {
        drawWay(queue.pop(), function() {
            doDrawWay();
        });
    } else {
        window.setTimeout(doDrawWay, 200);
    }
}

function pruneLines() {
    var mb = map.getBounds();
    lineGroup.eachLayer(function(l) {
        if (!mb.intersects(l.getBounds())) {
            lineGroup.removeLayer(l);
        } else {
            l.setStyle({
                opacity: 0.5
            });
        }
    });
}

var showTags = ['building', 'natural', 'leisure', 'barrier', 'landuse', 'highway'];

function setTagText(change) {
    for (var i = 0; i < showTags.length; i++) {
        if (change.neu.tags[showTags[i]]) {
            change.tagtext = showTags[i] + '=' + change.neu.tags[showTags[i]];
            return change;
        }
    }
    change.tagtext = 'a way';
    return change;
}

function drawWay(change, cb) {
    pruneLines();

    var way = change.neu;

    // Zoom to the area in question
    var bounds = new L.LatLngBounds(
        new L.LatLng(way.bounds[2], way.bounds[3]),
        new L.LatLng(way.bounds[0], way.bounds[1]));

    showLocation(bounds.getCenter());

    var timedate = moment(change.neu.timestamp);
    change.timetext = timedate.fromNow();

    map.fitBounds(bounds);
    overview_map.panTo(bounds.getCenter());
    changeset_info.innerHTML = changeset_tmpl({ change: setTagText(change) });

    if (change.neu.tags.building || change.neu.tags.area) {
        newLine = L.polygon([], {
            opacity: 1,
            color: '#FF00EA',
            fill: '#FF00EA'
        }).addTo(lineGroup);
    } else {
        newLine = L.polyline([], {
            opacity: 1,
            color: '#FF00EA'
        }).addTo(lineGroup);
    }
    // This is a bit lower than 3000 because we want the whole way
    // to stay on the screen for a bit before moving on.
    var perPt = 2250 / way.linestring.length;

    function drawPt(pt) {
        newLine.addLatLng(pt);
        if (way.linestring.length) {
            window.setTimeout(function() {
                drawPt(way.linestring.pop());
            }, perPt);
        } else {
            window.setTimeout(cb, perPt * 2);
        }
    }

    newLine.addLatLng(way.linestring.pop());
    drawPt(way.linestring.pop());
}

doDrawWay();
