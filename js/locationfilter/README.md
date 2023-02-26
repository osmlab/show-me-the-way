leaflet-locationfilter
======================

Provides a location filter for Leaflet. In short, the location filter is 
a draggable/resizable rectangle. It is integrated with your application
through a set of callbacks that are called when the user interacts with
the filter. 

leaflet-locationfilter is developed by <a href="http://tripbirds.com">Tripbirds.com</a>.
You may <a href="http://tripbirds.com/hotels/new-york/?bounds=40.721,-73.992,40.75,-73.969">see it in action here</a>.

Another similar plugin is <a href="https://github.com/heyman/leaflet-areaselect/">Leaflet.AreaSelect</a>, 
which solves the same problem, but with a fixed and centered rectangle, that can't be moved, and that has support for locking the aspect ratio of the selection. 


### Usage
Create a new LocationFilter and add it to the map:

```javascript
var locationFilter = new L.LocationFilter().addTo(map);
```

Bind some events:

```javascript
locationFilter.on("change", function (e) {
    // Do something when the bounds change.
    // Bounds are available in `e.bounds`.
});

locationFilter.on("enabled", function () {
    // Do something when enabled.
});

locationFilter.on("disabled", function () {
    // Do something when disabled.
});
```

Get the current bounds:

```javascript
var bounds = locationFilter.getBounds();
```

Check if the location filter is enabled:

```javascript
var isEnabled = locationFilter.isEnabled();
```

### Options
**bounds** (optional): The initial bounds for the location filter. Defaults to the maps own bounds.

**enable** (optional): Set to true to enable the filter as soon as it is added to the map. Defaults to false.

**buttonPosition**: Set to position the associated buttons on the map. Defaults to 'topleft'.

#### Events

**change**: Fired when the location filter changes size or position.

**enabled**:: Fired when the location filter gets enabled.

**disabled**: Fired when the location filter gets disabled.

**enableClick**: Fired when the user clicks the enable button.

**disableClick**: Fired when the user clicks the disable button.

**adjustToZoomClick**: Fired when the user clicks the adjust button.

### License
leaflet-locationfilter is free software, and may be redistributed under the MIT-LICENSE.
