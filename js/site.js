var osmStream = require('osm-stream'),
    reqwest = require('reqwest'),
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

    newLine = L.polyline([], {
        opacity: 1,
        color: '#3887be'
    }).addTo(map),

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
            '<p> ' + resp.display_name + ' </p>';
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

function drawWay(change, cb) {
    var way = change.neu;
    // Zoom to the area in question
    var bounds = new L.LatLngBounds(
        new L.LatLng(way.bounds[2], way.bounds[3]),
        new L.LatLng(way.bounds[0], way.bounds[1]));

    showLocation(bounds.getCenter());

    map.fitBounds(bounds);
    overview_map.panTo(bounds.getCenter());
    newLine.setLatLngs([]);
    changeset_info.innerHTML = changeset_tmpl({ change: change });

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
