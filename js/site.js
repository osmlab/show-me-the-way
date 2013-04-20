var osmStream = require('osm-stream'),
    _ = require('underscore');

var bboxString;
if (location.hash) {
    bboxString = location.hash.replace('#', '');
}

var ignore = ['bot-mode'];

var paused = false,

    BING_KEY = 'Arzdiw4nlOJzRwOz__qailc8NiR31Tt51dN2D7cm57NrnceZnCpgOkmJhNpGoppU',

    map = L.map('map', {
        zoomControl: false
    }).setView([51.505, -0.09], 13),

    bing = new L.BingLayer(BING_KEY, 'Aerial').addTo(map),

    overview_map = L.map('overview_map', {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false
    }).setView([51.505, -0.09], 4),

    osm = new L.TileLayer('http://a.tiles.mapbox.com/v3/tmcw.map-d11l16t9/{z}/{x}/{y}.jpg70', {
        minZoom: 8,
        maxZoom: 12,
        attribution: '<a href="http://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
    }).addTo(overview_map),

    newLine = L.polyline([], {
        opacity: 1,
        color: '#FF0099'
    }).addTo(map),

    changeset_info = document.getElementById('changeset_info'),
    changeset_tmpl = _.template(document.getElementById('changeset-template').innerHTML);

// Remove Leaflet shoutouts
map.attributionControl.setPrefix('');
overview_map.attributionControl.setPrefix('');

changeset_info.innerHTML = '<div class="loading">loading...</div>';

var queue = [];

// The number of changes to show per minute
osmStream.runFn(function(err, data) {
    queue = queue.concat(_.filter(data, function(f) {
        return f.neu && f.neu.type === 'way' &&
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
            window.setTimeout(cb, perPt);
        }
    }

    drawPt(way.linestring.pop());
}

doDrawWay();
