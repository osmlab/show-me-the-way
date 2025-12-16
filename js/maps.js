import { config } from './config';

class Maps {
    constructor(context, bbox) {
        this.context = context;
        const filteredBbox = context.bounds != config.bounds;
        const defaultCenter = [-0.09, 51.505];

        // Check if running locally
        const isLocal = window.location.hostname === 'localhost' ||
            window.location.hostname.startsWith('192');

        // Overview map always uses MapLibre demo tiles
        const overviewStyle = 'https://demotiles.maplibre.org/style.json';

        let mainStyle;

        if (isLocal) {
            // Local development: use OSM tiles with dark filter
            mainStyle = {
                version: 8,
                name: 'Dark Basemap',
                sources: {
                    'osm-tiles': {
                        type: 'raster',
                        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                        tileSize: 256,
                        attribution: '© OpenStreetMap contributors'
                    }
                },
                layers: [{
                    id: 'osm-tiles',
                    type: 'raster',
                    source: 'osm-tiles',
                    paint: {
                        'raster-saturation': -1,
                        'raster-brightness-max': 0.5,
                        'raster-contrast': 0.1
                    }
                }]
            };
        } else {
            // Production: use Mapbox styled tiles
            const mapboxKey = 'pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqe'
                + 'TBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw';
            
            mainStyle = {
                version: 8,
                name: 'Mapbox Dark',
                sources: {
                    'mapbox-tiles': {
                        type: 'raster',
                        tiles: [`https://api.mapbox.com/styles/v1/openstreetmapus/cju35gljt1bpm1fp2z93dlyca/tiles/256/{z}/{x}/{y}?access_token=${mapboxKey}`],
                        tileSize: 256,
                        attribution: '<a href="https://mapbox.com/about/maps/">Terms & Conditions</a>'
                    }
                },
                layers: [{
                    id: 'mapbox-tiles',
                    type: 'raster',
                    source: 'mapbox-tiles'
                }]
            };
        }

        // Main map for displaying updates
        this.main = new maplibregl.Map({
            container: 'map',
            style: mainStyle,
            center: defaultCenter,
            zoom: 13,
            interactive: false,
            attributionControl: false
        });

        // Add collapsed attribution control to main map
        this.main.addControl(new maplibregl.AttributionControl({ compact: true }));

        this.main.on('style.load', () => {
            this.main.setProjection({ type: 'globe' });
        });

        // Overview map for displaying the general area with geocoding details
        this.overviewMap = new maplibregl.Map({
            container: 'overview_map',
            style: overviewStyle,
            center: defaultCenter,
            zoom: 1,
            minZoom: 0.5,
            maxZoom: 2,
            interactive: false,
            attributionControl: false
        });

        this.overviewMap.on('style.load', () => {
            this.overviewMap.setProjection({ type: 'globe' });
        });

        this.overviewMarker = new maplibregl.Marker({ color: '#3887be' })
            .setLngLat([0, 0])
            .addTo(this.overviewMap);
        this.overviewMarker.getElement().style.display = 'none'; // Initially hidden
        this.lastOverviewLocation = null;

        // Apply filtered bbox if set
        if (filteredBbox) {
            const bounds = [[bbox.getWest(), bbox.getSouth()], [bbox.getEast(), bbox.getNorth()]];
            
            this.main.on('load', () => {
                this.main.fitBounds(bounds, { padding: 50, duration: 0 });
                this.addBboxRectangle(this.main, bbox, 'main-bbox-rect', 5);
            });
            
            this.overviewMap.on('load', () => {
                this.overviewMap.fitBounds(bounds, { padding: 20, duration: 0 });
                this.addBboxRectangle(this.overviewMap, bbox, 'overview-bbox-rect', 1);
            });
        }

        // Track features for cleanup
        this.featureCounter = 0;
        this.activeFeatures = [];

        this.main.on('load', () => {
            this.setupDrawingLayers();
            
            if (this.context.debug) {
                this.setupDebugLayer();
            }
        });
    }

    addBboxRectangle(map, bbox, id, width) {
        const coordinates = [
            [bbox.getWest(), bbox.getNorth()],
            [bbox.getEast(), bbox.getNorth()],
            [bbox.getEast(), bbox.getSouth()],
            [bbox.getWest(), bbox.getSouth()],
            [bbox.getWest(), bbox.getNorth()]
        ];

        map.addSource(id, {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: { type: 'LineString', coordinates }
            }
        });

        map.addLayer({
            id: id,
            type: 'line',
            source: id,
            paint: {
                'line-color': '#ffffff',
                'line-width': width
            }
        });
    }

    setupDrawingLayers() {
        // Source for all drawn features
        this.main.addSource('drawn-features', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] }
        });

        // Layer for lines/polygons
        this.main.addLayer({
            id: 'drawn-lines',
            type: 'line',
            source: 'drawn-features',
            filter: ['==', ['geometry-type'], 'LineString'],
            paint: {
                'line-color': ['get', 'color'],
                'line-width': 5,
                'line-opacity': ['get', 'opacity']
            }
        });

        // Layer for polygon fills
        this.main.addLayer({
            id: 'drawn-fills',
            type: 'fill',
            source: 'drawn-features',
            filter: ['==', ['geometry-type'], 'Polygon'],
            paint: {
                'fill-color': ['get', 'color'],
                'fill-opacity': ['*', ['get', 'opacity'], 0.3]
            }
        });

        // Layer for polygon outlines
        this.main.addLayer({
            id: 'drawn-polygon-outlines',
            type: 'line',
            source: 'drawn-features',
            filter: ['==', ['geometry-type'], 'Polygon'],
            paint: {
                'line-color': ['get', 'color'],
                'line-width': 5,
                'line-opacity': ['get', 'opacity']
            }
        });

        // Layer for points
        this.main.addLayer({
            id: 'drawn-points',
            type: 'circle',
            source: 'drawn-features',
            filter: ['==', ['geometry-type'], 'Point'],
            paint: {
                'circle-color': ['get', 'color'],
                'circle-radius': ['get', 'radius'],
                'circle-opacity': ['get', 'opacity'],
                'circle-stroke-width': 2,
                'circle-stroke-color': ['get', 'color']
            }
        });
    }

    setupDebugLayer() {
        this.main.addSource('debug-rect', {
            type: 'geojson',
            data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] } }
        });

        this.main.addLayer({
            id: 'debug-rect',
            type: 'line',
            source: 'debug-rect',
            paint: {
                'line-color': '#00ffff',
                'line-width': 2,
                'line-dasharray': [5, 5]
            }
        });

        this.main.on('moveend', () => this.updateDebugRect());
    }

    // Calculate the no-pan zone
    getNoPanBounds() {
        const bounds = this.main.getBounds();
        const north = bounds.getNorth();
        const south = bounds.getSouth();
        const east = bounds.getEast();
        const west = bounds.getWest();

        const latHeight = north - south;
        const lngWidth = east - west;

        // Intentionally leave more padding on the bottom for the overlay element
        return new maplibregl.LngLatBounds(
            [west + 0.125 * lngWidth, south + 0.125 * latHeight],
            [east - 0.125 * lngWidth, north - 0.05 * latHeight]
        );
    }

    updateDebugRect() {
        const noPanBounds = this.getNoPanBounds();
        const coordinates = [
            [noPanBounds.getWest(), noPanBounds.getNorth()],
            [noPanBounds.getEast(), noPanBounds.getNorth()],
            [noPanBounds.getEast(), noPanBounds.getSouth()],
            [noPanBounds.getWest(), noPanBounds.getSouth()],
            [noPanBounds.getWest(), noPanBounds.getNorth()]
        ];

        this.main.getSource('debug-rect').setData({
            type: 'Feature',
            geometry: { type: 'LineString', coordinates }
        });
    }

    pruneMapElements() {
        const visibleBounds = this.main.getBounds();
        
        // Fade out features that are still visible, remove ones that aren't
        this.activeFeatures = this.activeFeatures.filter((feature) => {
            let coordPairs;
            
            if (feature.geometry.type === 'Point') {
                coordPairs = [feature.geometry.coordinates];
            } else if (feature.geometry.type === 'Polygon') {
                coordPairs = feature.geometry.coordinates[0] || [];
            } else {
                // Ways to linestring
                coordPairs = feature.geometry.coordinates;
            }
            
            const isVisible = coordPairs.some((coord) => {
                if (!coord || coord.length < 2) return false;
                return visibleBounds.contains([coord[0], coord[1]]);
            });

            if (isVisible) {
                feature.properties.opacity = 0.5;
                return true;
            }
            return false;
        });

        this.updateDrawnFeatures();
    }

    updateDrawnFeatures() {
        const source = this.main.getSource('drawn-features');
        if (source) {
            source.setData({
                type: 'FeatureCollection',
                features: this.activeFeatures
            });
        }
    }

    drawMapElement(change, cb) {
        this.pruneMapElements();

        const noPanBounds = this.getNoPanBounds();
        const changeBounds = change.meta.bounds;
        const changeCenter = changeBounds.getCenter();

        // Determine if we need to fly to the change
        const boundsContained = noPanBounds.contains([changeCenter.lng, changeCenter.lat]);

        if (!boundsContained) {
            // Fly to fit the change bounds
            const distance = this.getDistanceFromCenter(changeCenter);
            // If the change is more than 1000km away it's a big jump so give it more time to pan
            const duration = distance > 1000000 ? 3000 : distance > 100000 ? 2000 : 1200;
            
            this.main.fitBounds(
                [[changeBounds.getWest(), changeBounds.getSouth()],
                 [changeBounds.getEast(), changeBounds.getNorth()]],
                {
                    maxZoom: 18,
                    padding: 200,
                    duration: duration
                }
            );
        } else if (this.context.debug) {
            this.updateDebugRect();
        }

        // Spin the overview globe to the new location
        // Clamp latitude and use pitch for polar regions to keep equator visible
        const targetLat = changeCenter.lat;
        const targetLng = changeCenter.lng;
        const maxCenterLat = 50; // Don't pan center beyond this latitude
        
        let centerLat = targetLat;
        let pitch = 0;
        
        if (Math.abs(targetLat) > maxCenterLat) {
            // Clamp the center latitude
            centerLat = Math.sign(targetLat) * maxCenterLat;
            // Calculate pitch based on how far beyond the limit we are
            const latBeyond = Math.abs(targetLat) - maxCenterLat;
            pitch = Math.min(50, latBeyond * 1.2);
        }
        
        // Check if new location is close to the last one (within ~500km)
        const isCloseToLast = this.lastOverviewLocation && 
            Math.abs(targetLat - this.lastOverviewLocation.lat) < 5 &&
            Math.abs(targetLng - this.lastOverviewLocation.lng) < 5;
        
        // Hide marker during animation if location changed significantly
        if (!isCloseToLast) {
            this.overviewMarker.getElement().style.display = 'none';
        }
        
        // Update marker to target location
        this.overviewMarker.setLngLat([targetLng, targetLat]);
        this.lastOverviewLocation = { lat: targetLat, lng: targetLng };
        
        this.overviewMap.flyTo({
            center: [targetLng, centerLat],
            pitch: pitch,
            duration: 1500
        });
        
        // Show marker after animation completes
        this.overviewMap.once('moveend', () => {
            this.overviewMarker.getElement().style.display = 'block';
        });

        const color = {
            create: '#B7FF00', // Green
            modify: '#FF00EA', // Pink
            delete: '#FF0000' // Red
        }[change.type];

        const drawTime = this.context.runTime * 0.7;
        const waitTime = this.context.runTime - drawTime;

        const mapElement = change.type === 'delete' ? change.old : change.neu;
        const featureId = `feature-${this.featureCounter++}`;

        // Calculate distance to determine if this is a "big jump"
        const distance = this.getDistanceFromCenter(changeCenter);
        const isBigJump = !boundsContained && distance > 1000; // > 1km

        const startDrawing = () => {
            switch (mapElement.type) {
                case 'way': {
                    this.drawWay(mapElement, color, featureId, drawTime, waitTime, cb);
                    break;
                }
                case 'node': {
                    this.drawNode(mapElement, color, featureId, drawTime, waitTime, cb);
                    break;
                }
                default: {
                    // Anything else just skip drawing and continue immediately
                    console.warn('Unknown mapElement type:', mapElement.type);
                    cb();
                }
            }
        };

        if (isBigJump) {
            // Wait for map to finish panning before drawing
            this.main.once('moveend', startDrawing);
        } else {
            // Start drawing immediately for nearby changes
            startDrawing();
        }
    }

    getDistanceFromCenter(lngLat) {
        const center = this.main.getCenter();
        // Rough distance in meters using Haversine
        const R = 6371000;
        const lat1 = center.lat * Math.PI / 180;
        const lat2 = lngLat.lat * Math.PI / 180;
        const dLat = (lngLat.lat - center.lat) * Math.PI / 180;
        const dLng = (lngLat.lng - center.lng) * Math.PI / 180;
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return R * c;
    }

    drawWay(mapElement, color, featureId, drawTime, waitTime, cb) {
        const isPolygon = mapElement.tags.building || mapElement.tags.area;
        const linestring = [...mapElement.linestring]; // Clone to avoid mutation
        const coordinates = [];
        const perPt = drawTime / linestring.length;

        // Create the feature
        const feature = {
            type: 'Feature',
            id: featureId,
            properties: { color, opacity: 1, id: featureId },
            geometry: {
                type: isPolygon ? 'Polygon' : 'LineString',
                coordinates: isPolygon ? [[]] : []
            }
        };

        this.activeFeatures.push(feature);

        const drawPt = () => {
            if (linestring.length) {
                const pt = linestring.pop();
                coordinates.push([pt[1], pt[0]]); // [lng, lat]
                
                if (isPolygon) {
                    feature.geometry.coordinates = [coordinates];
                } else {
                    feature.geometry.coordinates = coordinates;
                }
                
                this.updateDrawnFeatures();
                window.setTimeout(drawPt, perPt);
            } else {
                window.setTimeout(cb, waitTime);
            }
        };

        // Start drawing
        if (linestring.length) {
            const pt = linestring.pop();
            coordinates.push([pt[1], pt[0]]);
            if (isPolygon) {
                feature.geometry.coordinates = [coordinates];
            } else {
                feature.geometry.coordinates = coordinates;
            }
            this.updateDrawnFeatures();
            drawPt();
        }
    }

    drawNode(mapElement, color, featureId, drawTime, waitTime, cb) {
        // Animate radius from 0 to ~10
        const radii = [];
        for (let i = 0; i <= 25; i += 1) {
            radii.push(17 * Math.sin(i / 10));
        }

        const feature = {
            type: 'Feature',
            id: featureId,
            properties: { color, opacity: 1, radius: 0, id: featureId },
            geometry: {
                type: 'Point',
                coordinates: [mapElement.lon, mapElement.lat]
            }
        };

        this.activeFeatures.push(feature);

        const perRadius = drawTime / radii.length;
        
        const animateRadius = () => {
            if (radii.length) {
                feature.properties.radius = radii.shift();
                this.updateDrawnFeatures();
                window.setTimeout(animateRadius, perRadius);
            } else {
                window.setTimeout(cb, waitTime);
            }
        };

        animateRadius();
    }
}

export { Maps };
