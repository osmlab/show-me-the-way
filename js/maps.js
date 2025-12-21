import { config } from './config';
import { getRandomCity } from './cities';
import { distanceBetween } from './utils';

class Maps {
    constructor(context, bbox) {
        this.context = context;
        const filteredBbox = context.bounds != config.bounds;
        const defaultCenter = getRandomCity().center;

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

        // Track current changeset
        this.currentChangesetId = null;

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

    // Calculate bounding box containing all active features
    getActiveFeaturesBounds() {
        const bounds = new maplibregl.LngLatBounds();

        for (const feature of this.activeFeatures) {
            const geom = feature.geometry;

            if (geom.type === 'Point') {
                bounds.extend(geom.coordinates);
            } else if (geom.type === 'LineString') {
                for (const coord of geom.coordinates) {
                    bounds.extend(coord);
                }
            } else if (geom.type === 'Polygon') {
                for (const coord of geom.coordinates[0] || []) {
                    bounds.extend(coord);
                }
            }
        }

        return bounds;
    }

    drawMapElement(change, cb) {
        this.pruneMapElements();

        const noPanBounds = this.getNoPanBounds();
        const changeBounds = change.meta.bounds;
        const changeCenter = changeBounds.getCenter();
        const changesetId = change.meta.changeset;
        const distance = this.getDistanceFromCenter(changeCenter);

        // Check if this change is a continuation of the same changeset and close enough by
        const isSameChangeset = this.currentChangesetId === changesetId;
        const isNearby = distance <= 5000; // 5km threshold

        // Determine if we need to fly to the change
        const boundsContained = noPanBounds.contains([changeCenter.lng, changeCenter.lat]);

        if (isSameChangeset && isNearby && !boundsContained) {
            // Same changeset and nearby: fit viewport to all active geometry + new change
            const combinedBounds = this.getActiveFeaturesBounds();

            // Extend to include the new change
            combinedBounds.extend([changeBounds.getWest(), changeBounds.getSouth()]);
            combinedBounds.extend([changeBounds.getEast(), changeBounds.getNorth()]);

            this.main.fitBounds(
                [[combinedBounds.getWest(), combinedBounds.getSouth()],
                 [combinedBounds.getEast(), combinedBounds.getNorth()]],
                {
                    maxZoom: 18,
                    padding: { top: 50, bottom: 200, left: 100, right: 100 },
                    duration: 500
                }
            );
        } else if (!boundsContained) {
            this.main.fitBounds(
                [[changeBounds.getWest(), changeBounds.getSouth()],
                 [changeBounds.getEast(), changeBounds.getNorth()]],
                {
                    maxZoom: 18,
                    padding: { top: 50, bottom: 200, left: 100, right: 100 },
                    duration: this.getFlightDuration(distance)
                }
            );
        } else if (this.context.debug) {
            this.updateDebugRect();
        }

        // Update changeset tracking
        if (!this.currentChangesetId || !isSameChangeset) {
            this.currentChangesetId = changesetId;
        }

        this.updateOverviewGlobe(changeCenter);

        const color = this.getChangeColor(change.type);

        const drawTime = this.context.runTime * 0.7;
        const waitTime = this.context.runTime - drawTime;

        const mapElement = change.type === 'delete' ? change.old : change.neu;
        const featureId = `feature-${this.featureCounter++}`;


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

        if (!isNearby) {
            // Wait for map to finish panning before drawing
            this.main.once('moveend', startDrawing);
        } else {
            // Start drawing immediately for nearby changes
            startDrawing();
        }
    }

    getDistanceFromCenter(lngLat) {
        const center = this.main.getCenter();
        return distanceBetween(center.lat, center.lng, lngLat.lat, lngLat.lng);
    }

    getChangeColor(type) {
        return {
            create: '#B7FF00',
            modify: '#FF00EA',
            delete: '#FF0000'
        }[type];
    }

    getFlightDuration(distance) {
        return distance > 1000000 ? 3000 : distance > 100000 ? 2000 : 1200;
    }

    updateOverviewGlobe(center, alwaysHideMarker = false) {
        const targetLat = center.lat;
        const targetLng = center.lng;
        const maxCenterLat = 50;

        let centerLat = targetLat;
        let pitch = 0;

        if (Math.abs(targetLat) > maxCenterLat) {
            centerLat = Math.sign(targetLat) * maxCenterLat;
            const latBeyond = Math.abs(targetLat) - maxCenterLat;
            pitch = Math.min(50, latBeyond * 1.2);
        }

        // Check if new location is close to the last one (within ~500km)
        const isCloseToLast = !alwaysHideMarker && this.lastOverviewLocation &&
            Math.abs(targetLat - this.lastOverviewLocation.lat) < 5 &&
            Math.abs(targetLng - this.lastOverviewLocation.lng) < 5;

        // Hide marker during animation if location changed significantly
        if (!isCloseToLast) {
            this.overviewMarker.getElement().style.display = 'none';
        }

        this.overviewMarker.setLngLat([targetLng, targetLat]);
        this.lastOverviewLocation = { lat: targetLat, lng: targetLng };

        this.overviewMap.flyTo({
            center: [targetLng, centerLat],
            pitch: pitch,
            duration: 1500
        });

        this.overviewMap.once('moveend', () => {
            this.overviewMarker.getElement().style.display = 'block';
        });
    }

    drawWay(mapElement, color, featureId, drawTime, waitTime, cb) {
        const isPolygon = mapElement.tags.building || mapElement.tags.area;
        const linestring = [...mapElement.linestring]; // Clone to avoid mutation
        if (Math.random() > 0.5) {
            linestring.reverse(); // Randomize winding direction for variety
        }
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
                // Fade opacity once animation completes
                feature.properties.opacity = 0.5;
                this.updateDrawnFeatures();
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
                // Fade opacity once animation completes
                feature.properties.opacity = 0.5;
                this.updateDrawnFeatures();
                window.setTimeout(cb, waitTime);
            }
        };

        animateRadius();
    }

    // Draw multiple changes simultaneously
    drawMapElementBatch(changes, cb) {
        this.pruneMapElements();

        // Calculate combined bounds for all changes
        const combinedBounds = new maplibregl.LngLatBounds();
        for (const change of changes) {
            const changeBounds = change.meta.bounds;
            combinedBounds.extend([changeBounds.getWest(), changeBounds.getSouth()]);
            combinedBounds.extend([changeBounds.getEast(), changeBounds.getNorth()]);
        }

        const changeCenter = combinedBounds.getCenter();
        const changesetId = changes[0].meta.changeset;

        // Update changeset tracking
        this.currentChangesetId = changesetId;

        // Move viewport to fit all changes
        const distance = this.getDistanceFromCenter(changeCenter);

        this.main.fitBounds(
            [[combinedBounds.getWest(), combinedBounds.getSouth()],
             [combinedBounds.getEast(), combinedBounds.getNorth()]],
            {
                maxZoom: 17, // Slightly lower max zoom for batches
                padding: 150,
                duration: this.getFlightDuration(distance)
            }
        );

        this.updateOverviewGlobe(changeCenter, true);

        // Track completion of all drawings
        let completedCount = 0;
        const totalCount = changes.length;

        const onDrawingComplete = () => {
            completedCount++;
            if (completedCount === totalCount) {
                cb();
            }
        };

        // Start drawings in waves with limited concurrency
        const startAllDrawings = () => {
            // Randomize concurrent drawings between 4 and 7 for variety
            const CONCURRENT_DRAWINGS = 4 + Math.floor(Math.random() * 4);
            const baseDrawTime = this.context.runTime * 0.7;
            // Space starts so roughly CONCURRENT_DRAWINGS are drawing at once
            const spacingPerItem = baseDrawTime / CONCURRENT_DRAWINGS;

            changes.forEach((change, index) => {
                // Base delay staggers items so ~N overlap
                const baseDelay = index * spacingPerItem;
                // Add jitter: +/- 50% of spacing (wider variation)
                const jitter = (Math.random() - 0.5) * spacingPerItem;
                const startDelay = Math.max(0, baseDelay + jitter);
                
                // Non-linear speed: bias toward extremes
                // Random value 0-1, then transform to get more slow and fast, fewer medium
                const r = Math.random();
                // Use a curve that pushes values toward edges: 0.5x to 3x range
                // r < 0.5 -> slower (0.5 to 1.0), r >= 0.5 -> faster (1.0 to 3.0)
                const speedMultiplier = r < 0.5 
                    ? 0.5 + r             // 0.5 to 1.0 (slower half)
                    : 1.0 + (r - 0.5) * 4; // 1.0 to 3.0 (faster half)

                setTimeout(() => {
                    this.drawSingleElement(change, speedMultiplier, onDrawingComplete);
                }, startDelay);
            });
        };

        // Wait for viewport to settle before drawing
        if (distance > 1000) {
            this.main.once('moveend', startAllDrawings);
        } else {
            startAllDrawings();
        }
    }

    /**
     * Draw a single element with custom speed (used by batch drawing)
     * speedMultiplier only affects ways; nodes use consistent timing
     */
    drawSingleElement(change, speedMultiplier, cb) {
        const color = this.getChangeColor(change.type);
        const baseDrawTime = this.context.runTime * 0.7;
        const waitTime = 0; // No wait time in batch mode - we track completion separately

        const mapElement = change.type === 'delete' ? change.old : change.neu;
        const featureId = `feature-${this.featureCounter++}`;

        switch (mapElement.type) {
            case 'way': {
                // Ways get varied speed
                const drawTime = baseDrawTime * speedMultiplier;
                this.drawWay(mapElement, color, featureId, drawTime, waitTime, cb);
                break;
            }
            case 'node': {
                // Nodes use consistent timing
                this.drawNode(mapElement, color, featureId, baseDrawTime, waitTime, cb);
                break;
            }
            default: {
                console.warn('Unknown mapElement type:', mapElement.type);
                cb();
            }
        }
    }
}

export { Maps };
