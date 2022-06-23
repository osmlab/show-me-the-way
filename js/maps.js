import { config } from './config';

class Maps {
    constructor(context, bbox) {
        this.context = context;
        this.lastLocation = L.latLng(0, 0);
        const filteredBbox = context.bounds != config.bounds;

        this.main = L.map('map', {
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false
        });

        if (filteredBbox) {
            L.rectangle(bbox, {
                color: '#ffffff',
                weight: 5,
                fill: false
            }).addTo(this.main);
            this.main.fitBounds(bbox);
        } else {
            this.main.setView(context.defaultCenter, 13);
        }

        this.overview_map = L.map('overview_map', {
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
            }).addTo(this.overview_map);
            this.overview_map.fitBounds(bbox);
        } else {
            this.overview_map.setView(context.defaultCenter, 4);
        }

        const mapboxKey = 'pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqe'
            + 'TBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw';

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
        }).addTo(this.overview_map);

        // Remove Leaflet shoutouts
        this.main.attributionControl.setPrefix('');
        this.overview_map.attributionControl.setPrefix(false);

        this.feature_group = L.featureGroup().addTo(this.main);
    }

    farFromLast(LatLng) {
        this.lastLocation = LatLng;
        return this.lastLocation.distanceTo(LatLng) > 5000;
    }

    pruneMapElements() {
        const visible_bounds = this.main.getBounds();

        this.feature_group.eachLayer((l) => {
            const feature_bounds = 'getBounds' in l ?
                l.getBounds() : l.getLatLng().toBounds(10);

            if (visible_bounds.intersects(feature_bounds)) {
                l.setStyle({ opacity: 0.5 });
            } else {
                this.feature_group.removeLayer(l);
            }
        });
    }

    drawMapElement(change, cb) {
        this.pruneMapElements();
        this.main.fitBounds(change.meta.bounds);
        this.overview_map.panTo(change.meta.bounds.getCenter());

        const color = {
            create: '#B7FF00',
            modify: '#FF00EA',
            delete: '#FF0000'
        }[change.type];

        const drawTime = this.context.runSpeed * 0.7;
        const waitTime = this.context.runSpeed - drawTime;

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
                    }).addTo(this.feature_group);
                } else {
                    newLine = L.polyline([], {
                        opacity: 1,
                        color: color,
                        weight: 5,
                        interactive: false
                    }).addTo(this.feature_group);
                }
                const perPt = drawTime / mapElement.linestring.length;

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
                }).addTo(this.feature_group);

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

                nodeMarkerAnimation();
                break;
            }
        }
    }
}

export { Maps };
