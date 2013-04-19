var osmStream = require('osm-stream');

var bboxString;
if (location.hash) {
    bboxString = location.hash.replace('#', '');
}

var paused = false,

    map = L.map('map', {
        zoomControl: false
    }).setView([51.505, -0.09], 13),

    bing = new L.BingLayer('Arzdiw4nlOJzRwOz__qailc8NiR31Tt51dN2D7cm57NrnceZnCpgOkmJhNpGoppU', 'Aerial')
        .addTo(map),

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

    changesToShowEveryMinute = 20,

    // oldLine = L.polyline([], {
    //     opacity: 0.3
    // }).addTo(map),

    newLine = L.polyline([], {
        opacity: 1,
        color: '#FF0099'
    }).addTo(map),

    millisPerChange = 1500,
    changeset_info = document.getElementById('changeset_info'),
    changeset_tmpl = _.template(document.getElementById('changeset-template').innerHTML);

// Remove Leaflet shoutouts
map.attributionControl.setPrefix('');
overview_map.attributionControl.setPrefix('');

// The number of changes to show per minute
osmStream.runFn(function(err, data) {
    // Only include way creates or modifies
    var filteredChanges = _.chain(data).filter(function(f) {
        return f.neu && f.neu.type === 'way' && f.type !== 'delete' && f.neu.linestring;
    }).sortBy(function(f) {
        // Sort by "interestingness". For now just the number of ways?
        return f.neu.linestring.length;
    // Only pick the 30 most interestin changes so we can spend 2 seconds on each change
    }).value().slice(0, changesToShowEveryMinute);

    var millisPerChange = (60000 / filteredChanges.length),
        wayAddInterval = setInterval(function() {
            var nextChange = filteredChanges.pop();
            if (paused) {
            } else if (nextChange === undefined) {
                clearInterval(wayAddInterval);
            } else {
                drawLineChange(nextChange);
            }
        }, millisPerChange);
}, 60 * 1000, 1, bboxString);

function drawLineChange(change) {
    // Zoom to the area in question
    var bounds = new L.LatLngBounds(
        new L.LatLng(change.neu.bounds[2], change.neu.bounds[3]),
        new L.LatLng(change.neu.bounds[0], change.neu.bounds[1]));

    map.fitBounds(bounds);
    overview_map.panTo(bounds.getCenter());

    // Remove the previous lines, if any
    // oldLine.setLatLngs([]);
    newLine.setLatLngs([]);

    changeset_info.innerHTML = changeset_tmpl({ change: change });

    // Draw the old way in the background
    // if ('old' in change) {
    //     oldLine.setLatLngs(change.old.linestring);
    // }

    // Draw the new way in 1.5 seconds, node by node
    var nodeAddInterval = setInterval(function() {
        var nextPoint = change.neu.linestring.pop();
        if (nextPoint === undefined) {
            clearInterval(nodeAddInterval);
        } else {
            newLine.addLatLng(nextPoint);
        }
    }, (millisPerChange / change.neu.linestring.length));
}

function togglePause() {
    paused = !paused;
    // TODO Stop and start the osmstream?
    document.getElementById('pause_button').innerHTML = paused ? 'Continue' : 'Pause';
}
