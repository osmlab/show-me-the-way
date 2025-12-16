import { makeBbox, fetchWithRetry } from './utils';

import { formatDistanceStrict } from 'date-fns';

// Helper function to calculate distance between two points in meters (Haversine formula)
function distanceBetween(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Earth's radius in meters
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

class Change {
    constructor(context, changeObj) {
        this.context = context;
        Object.assign(this, changeObj);
    }

    async fetchChangesetData(id) {
        const cachedData = this.context.changesetCache.get(id);
        if (cachedData) {
            return cachedData;
        }

        const response = await fetchWithRetry(
            `//www.openstreetmap.org/api/0.6/changeset/${id}`,
            { mode: 'cors' },
            { timeout: 5000, retries: 2 }
        );
        const responseString = await response.text();
        const data = new window.DOMParser()
            .parseFromString(responseString, 'text/xml');

        const changesetData = {};
        const tags = data.getElementsByTagName('tag');

        for (let i = 0; i < tags.length; i++) {
            const key = tags[i].getAttribute('k');
            const value = tags[i].getAttribute('v');
            changesetData[key] = value;
        }

        this.context.changesetCache.set(id, changesetData);
        return changesetData;
    }

    async fetchDisplayName(boundsCenter) {
        const CLOSE_THRESHOLD_METERS = 10000;
        const closeByKey = this.context.geocodeCache.keys().find((key) => {
            const [lat, lon] = key.split(',').map(parseFloat);
            return distanceBetween(boundsCenter.lat, boundsCenter.lng, lat, lon) < CLOSE_THRESHOLD_METERS;
        });

        if (closeByKey) {
            const cachedGeocode = this.context.geocodeCache.get(closeByKey);
            if (cachedGeocode) {
                return cachedGeocode;
            }
        }

        const lat = boundsCenter.lat;
        const lon = boundsCenter.lng;

        const nominatimUrl = `//nominatim.openstreetmap.org/reverse`
            + `?format=json&lat=${lat}&lon=${lon}&zoom=5`;

        try {
            const response = await fetchWithRetry(
                nominatimUrl,
                { mode: 'cors' },
                { timeout: 5000, retries: 2 }
            );
            const data = await response.json();
            const id = `${lat},${lon}`;
            const displayName = data.display_name;
            this.context.geocodeCache.set(id, displayName);
            return displayName;
        } catch (err) {
            console.warn('Failed to fetch location after retries:', err.message);
            return null; // Graceful fallback
        }
    }

    isRelevant() {
        return new Promise((resolve) => {
            let commentRelevance = false;
            let keyRelevance = false;
            const mapElement = this.neu || this.old;

            if (this.context.comment === "" && !this.context.key) {
                return resolve(true);
            }

            this.fetchChangesetData(mapElement.changeset)
                .then((changesetData) => {

                    commentRelevance = 
                        this.context.comment !== "" && 
                        changesetData.comment?.toLowerCase()
                            .includes(this.context.comment.toLowerCase()) || false;

                    keyRelevance = Object.keys(mapElement.tags).includes(this.context.key);

                    if (!(commentRelevance || keyRelevance)) {
                        console.log(
                            "Skipping map element " + mapElement.id
                            + " because it didn't match filters."
                        );
                    }

                    return resolve(commentRelevance | keyRelevance);
                });
        });
    }

    createTagText() {
        const showTags = ['building', 'natural', 'leisure', 'waterway',
            'barrier', 'landuse', 'highway', 'power', 'amenity', 'place',
            'addr:housenumber', 'memorial', 'historic', 'shop', 'office',
            'emergency'];
        const mapElement = this.type === 'delete' ? this.old : this.neu;
        const tags = mapElement.tags;
        for (let i = 0; i < showTags.length; i++) {
            if (tags[showTags[i]]) {
                return showTags[i] + '=' + tags[showTags[i]];
            }
        }
        return 'a ' + mapElement.type;
    }

    async enhance() {
        console.log('Enhancing change, fetching changeset + geocode...');
        const startTime = Date.now();
        const mapElement = this.type === 'delete' ? this.old : this.neu;
        const bounds = mapElement.type === 'way'
                ? makeBbox(mapElement.bounds)
                : makeBbox([
                    mapElement.lat, mapElement.lon,
                    mapElement.lat, mapElement.lon
                ]);

        const pastTense = {
            create: 'created',
            modify: 'modified',
            delete: 'deleted'
        };

        this.meta = {
            action: pastTense[this.type],
            bounds: bounds,
            id: mapElement.id,
            type: mapElement.type,
            // always pull in the neu user, timestamp, and changeset info
            user: this.neu.user,
            changeset: this.neu.changeset
        };

        this.meta.timetext = formatDistanceStrict(
            new Date(this.neu.timestamp),
            new Date(),
            { addSuffix: true }
        );

        this.tagText = this.createTagText();

        const [changesetData, displayName] = await Promise.all([
            this.fetchChangesetData(this.meta.changeset),
            this.fetchDisplayName(bounds.getCenter()),
        ]);

        console.log(`Enhance complete in ${Date.now() - startTime}ms`);
        this.meta.comment = changesetData.comment || '';
        this.meta.createdBy = changesetData.created_by || '';
        this.meta.displayName = displayName || '';
        return this;
    }
}

export { Change };
