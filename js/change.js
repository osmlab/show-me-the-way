import { makeBbox } from './utils';

import { formatDistanceStrict } from 'date-fns';

class Change {
    constructor(context, changeObj) {
        this.context = context;
        Object.assign(this, changeObj);
    }

    fetchChangesetData(id) {
        return new Promise((resolve, reject) => {
            const cachedData = this.context.changesetCache.get(id);
            if (cachedData) {
                return resolve(cachedData);
            }

            fetch(`//www.openstreetmap.org/api/0.6/changeset/${id}`, {
                mode: 'cors'
            })
            .then((response) => response.text())
            .then((responseString) => {
                return new window.DOMParser()
                    .parseFromString(responseString, 'text/xml');
            })
            .then((data) => {
                const changesetData = {};
                const tags = data.getElementsByTagName('tag');

                for (let i = 0; i < tags.length; i++) {
                    const key = tags[i].getAttribute('k');
                    const value = tags[i].getAttribute('v');
                    changesetData[key] = value;
                }

                this.context.changesetCache.set(id, changesetData);

                resolve(changesetData);
            })
            .catch((err) => {
                console.log('Error fetching changeset data', err);
                reject(err);
            });
        });
    }

    fetchDisplayName(boundsCenter) {
        return new Promise((resolve, reject) => {
            const CLOSE_THRESHOLD_METERS = 10000;
            const closeByKey = this.context.geocodeCache.keys().find((key) => {
                const [ lat, lon ] = key.split(',').map(parseFloat);
                return boundsCenter.distanceTo(L.latLng(lat, lon)) < CLOSE_THRESHOLD_METERS;
            });

            if (closeByKey) {
                const cachedGeocode = this.context.geocodeCache.get(closeByKey);
                if (cachedGeocode) {
                    return resolve(cachedGeocode);
                }
            }

            const lat = boundsCenter.lat;
            const lon = boundsCenter.lng;

            const nominatimUrl = `//nominatim.openstreetmap.org/reverse`
                + `?format=json&lat=${lat}&lon=${lon}&zoom=5`;

            fetch(nominatimUrl, {
                mode: 'cors'
            })
                .then((response) => response.json())
                .then((data) => {
                    const id = `${lat},${lon}`;
                    const displayName = data.display_name;
                    this.context.geocodeCache.set(id, displayName);
                    resolve(displayName);
                })
                .catch((err) => {
                    console.error('Error fetching location', err);
                    reject(err);
                });
        });
    }

    isRelevant() {
        return new Promise((resolve) => {
            let relevant = false;
            const mapElement = this.neu || this.old;

            if (this.context.comment == "") {
                return resolve(true);
            }

            this.fetchChangesetData(mapElement.changeset)
                .then((changesetData) => {
                    relevant = (
                        changesetData.comment &&
                        changesetData.comment.toLowerCase()
                            .indexOf(this.context.comment.toLowerCase()) > -1
                    );

                    if (!relevant) {
                        console.log(
                            "Skipping map element " + mapElement.id
                            + " because changeset " + mapElement.changeset
                            + " didn't match " + this.context.comment
                        );
                    }

                    return resolve(relevant);
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

    enhance() {
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

        return Promise.all([
            this.fetchChangesetData(this.meta.changeset),
            this.fetchDisplayName(bounds.getCenter()),
        ]).then(([changesetData, displayName]) => {
            this.meta.comment = changesetData.comment;
            this.meta.createdBy = changesetData.created_by;
            this.meta.displayName = displayName;
            return this;
        });
    }
}

export { Change };
