import { config } from './config';

class Maps {
    constructor(context, bbox) {
        this.context = context;
        const filteredBbox = context.bounds != config.bounds;
        const defaultCenter = '51.505,-0.09'.split(',');

        this.main = L.map('map', {
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            zoomSnap: 0
        });

        if (filteredBbox) {
            L.rectangle(bbox, {
                color: '#ffffff',
                weight: 5,
                fill: false
            }).addTo(this.main);
            this.main.fitBounds(bbox);
        } else {
            this.main.setView(defaultCenter, 13);
        }

        this.overviewMap = L.map('overview_map', {
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
            L.rectangle(bbox, {
                color: '#ffffff',
                weight: 1,
                fill: false
            }).addTo(this.overviewMap);
            this.overviewMap.fitBounds(bbox);
        } else {
            this.overviewMap.setView(defaultCenter, 4);
        }

        const mapboxKey = 'pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqe'
            + 'TBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw';

        /* eslint-disable camelcase */
        // the style_id property throws off this rule

        new L.TileLayer(
            'https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}', {
            style_id: 'cju35gljt1bpm1fp2z93dlyca',
            key: mapboxKey,
            attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
        }).addTo(this.main);

        new L.TileLayer(
            'https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}', {
            minZoom: 4,
            maxZoom: 8,
            style_id: 'cj8xtgojqhd3z2sorzpi01csj',
            key: mapboxKey,
            attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
        }).addTo(this.overviewMap);

        /* eslint-enable camelcase */

        // Remove Leaflet shoutouts
        this.main.attributionControl.setPrefix('');
        this.overviewMap.attributionControl.setPrefix(false);

        this.featureGroup = L.featureGroup().addTo(this.main);

        this.setupAdaptiveColor();
    }

    setupAdaptiveColor() {
        this.adaptiveColorSamples = [];
        this.sampleCanvas = document.createElement('canvas');
        this.sampleCtx = this.sampleCanvas.getContext('2d', { willReadFrequently: true });
        this.adaptiveUpdatePending = false;
        this.tileCounter = 0;

        // Create a background div behind the map for adaptive color
        const mapContainer = this.main.getContainer();
        this.adaptiveBgDiv = document.createElement('div');
        this.adaptiveBgDiv.className = 'adaptive-bg';
        mapContainer.insertBefore(this.adaptiveBgDiv, mapContainer.firstChild);

        this.mainTileLayer.on('tileload', (e) => this.onTileLoad(e));
    }

    onTileLoad(e) {
        this.tileCounter++;
        // sample every 5th tile
        if (this.tileCounter % 5 !== 0) return;

        const tile = e.tile;

        try {
            const w = tile.naturalWidth || tile.width;
            const h = tile.naturalHeight || tile.height;

            // only resize canvas if dimensions changed (resizing is expensive)
            if (this.sampleCanvas.width !== w || this.sampleCanvas.height !== h) {
                this.sampleCanvas.width = w;
                this.sampleCanvas.height = h;
            }
            this.sampleCtx.drawImage(tile, 0, 0);

            // sample 1 random point per tile
            const x = Math.floor(Math.random() * w);
            const y = Math.floor(Math.random() * h);
            const pixel = this.sampleCtx.getImageData(x, y, 1, 1).data;
            this.adaptiveColorSamples.push({ r: pixel[0], g: pixel[1], b: pixel[2] });

            // keep the last 20 samples
            if (this.adaptiveColorSamples.length > 20) {
                this.adaptiveColorSamples = this.adaptiveColorSamples.slice(-20);
            }

            this.updateAdaptiveColor();
        } catch (err) {
            console.log('Could not sample tile color:', err.message);
        }
    }

    updateAdaptiveColor() {
        if (this.adaptiveColorSamples.length === 0 || this.adaptiveUpdatePending) return;

        this.adaptiveUpdatePending = true;
        requestAnimationFrame(() => {
            const sum = this.adaptiveColorSamples.reduce(
                (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
                { r: 0, g: 0, b: 0 }
            );

            const count = this.adaptiveColorSamples.length;
            const r = Math.round(sum.r / count);
            const g = Math.round(sum.g / count);
            const b = Math.round(sum.b / count);

            // apply to map background
            this.adaptiveBgDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

            this.adaptiveUpdatePending = false;
        });
    }

    pruneMapElements() {
        const visibleBounds = this.main.getBounds();

        this.featureGroup.eachLayer((l) => {
            const featureBounds = 'getBounds' in l ?
                l.getBounds() : l.getLatLng().toBounds(10);

            if (visibleBounds.intersects(featureBounds)) {
                l.setStyle({ opacity: 0.5 });
            } else {
                this.featureGroup.removeLayer(l);
            }
        });
    }

    drawMapElement(change, cb) {
        this.pruneMapElements();
        this.main.fitBounds(change.meta.bounds, {
            padding: [10, 10], // reduced from default of 20, 20
            easeLinearity: 1 // less bouncy
        });
        this.overviewMap.panTo(change.meta.bounds.getCenter());

        const color = {
            create: '#B7FF00', // green
            modify: '#FF00EA', // pink
            delete: '#FF0000' // red
        }[change.type];

        const drawTime = this.context.runTime * 0.7;
        const waitTime = this.context.runTime - drawTime;

        const mapElement = change.type === 'delete' ? change.old : change.neu;

        switch (mapElement.type) {
            case 'way': {
                let newLine;
                if (mapElement.tags.building || mapElement.tags.area) {
                    newLine = L.polygon([], {
                        opacity: 1,
                        color: color,
                        fill: color,
                        weight: 5,
                        interactive: false
                    }).addTo(this.featureGroup);
                } else {
                    newLine = L.polyline([], {
                        opacity: 1,
                        color: color,
                        weight: 5,
                        interactive: false
                    }).addTo(this.featureGroup);
                }
                const perPt = drawTime / mapElement.linestring.length;

                /* eslint-disable no-inner-declarations */
                function drawPt(pt) {
                    newLine.addLatLng(pt);
                    if (mapElement.linestring.length) {
                        window.setTimeout(() => {
                            drawPt(mapElement.linestring.pop());
                        }, perPt);
                    } else {
                        window.setTimeout(cb, waitTime);
                    }
                }

                newLine.addLatLng(mapElement.linestring.pop());
                drawPt(mapElement.linestring.pop());
                break;
            }
            case 'node': {
                // Calculate marker radii such that final radius is ~10px
                const radii = [];
                for (let i = 0; i <= 25; i += 1) {
                    radii.push(17 * Math.sin(i / 10));
                }
                const newMarker = L.circleMarker([mapElement.lat, mapElement.lon], {
                    opacity: 1,
                    color: color,
                    weight: 5,
                    interactive: false
                }).addTo(this.featureGroup);

                const perRadius = drawTime / radii.length;
                function nodeMarkerAnimation() {
                    newMarker.setRadius(radii.shift());
                    if (radii.length) {
                        window.setTimeout(nodeMarkerAnimation, perRadius);
                    }
                    else {
                        window.setTimeout(cb, waitTime);
                    }
                }
                /* eslint-enable no-inner-declarations */

                nodeMarkerAnimation();
                break;
            }
        }
    }
}

export { Maps };
