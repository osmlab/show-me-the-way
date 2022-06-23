import { makeBbox } from './utils';

import { formatDistanceStrict } from 'date-fns';

class Change {
    constructor(context, changeObj) {
        this.context = context;
        this.isRelevant = this._isRelevant(changeObj);
        Object.assign(this, changeObj);
    }

    fetchChangesetData(id) {
        return new Promise((resolve, reject) => {
            const cached_data = this.context.changesetCache.get(id);
            if (cached_data) {
                return resolve(cached_data);
            }

            const urlTemplate = '//www.openstreetmap.org/api/0.6/changeset/{id}';
            fetch(urlTemplate.replace('{id}', id), {
                mode: 'cors'
            })
            .then(response => response.text())
            .then(responseString => new window.DOMParser().parseFromString(responseString, 'text/xml'))
            .then(data => {
                const changeset_data = {};
                const tags = data.getElementsByTagName('tag');

                for (let i = 0; i < tags.length; i++) {
                    const key = tags[i].getAttribute('k');
                    const value = tags[i].getAttribute('v');
                    changeset_data[key] = value;
                }

                this.context.changesetCache.set(id, changeset_data);

                resolve(changeset_data);
            })
            .catch(err => {
                console.log('Error fetching changeset data', err);
                reject(err);
            });
        });
    }

    fetchDisplayName(boundsCenter) {
        // todo, rethink farFromLast logic
        // if (this.farFromLast(change.meta.bounds.getCenter())) {
        //     showLocation(change.meta.bounds.getCenter());
        // }

        return new Promise((resolve, reject) => {
            const nominatim_tmpl = '//nominatim.openstreetmap.org/reverse?format=json' +
                '&lat={lat}&lon={lon}&zoom=5';
            fetch(nominatim_tmpl.replace('{lat}', boundsCenter.lat).replace('{lon}', boundsCenter.lng), {
                mode: 'cors'
            })
                .then(response => response.json())
                .then(data => {
                    console.log('resolved fetchDisplayName');
                    resolve(data);
                })
                .catch(err => {
                    console.error('Error fetching location', err);
                    reject(err);
                });
        });
    }

    async _isRelevant(change) {
        let relevant = false;
        const mapElement = change.neu || change.old;

        if (this.context.comment && this.context.comment != "" && mapElement.changeset) {
            await this.fetchChangesetData(mapElement.changeset)
                .then(changeset_data => {
                    relevant = (
                        changeset_data.comment &&
                        changeset_data.comment.indexOf(this.context.comment) > -1
                    );

                    if (!relevant) {
                        console.log(
                            "Skipping map element " + mapElement.id
                            + " because changeset " + mapElement.changeset
                            + " didn't match " + this.context.comment
                        );
                    }
                });
        } else {
            relevant = true;
        }

        return relevant;
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
        const mapElement = this.type === 'delete' ? this.old : this.neu;

        const past_tense = {
            create: 'created',
            modify: 'modified',
            delete: 'deleted'
        };

        this.meta = {
            action: past_tense[this.type],
            id: mapElement.id,
            type: mapElement.type,
            // always pull in the neu user, timestamp, and changeset info
            user: this.neu.user,
            changeset: this.neu.changeset
        };

        await this.fetchChangesetData(this.meta.changeset)
            .then(changeset_data => {
                this.meta.comment = changeset_data.comment;
                this.meta.created_by = changeset_data.created_by;
            });

        this.meta.bounds = mapElement.type === 'way'
            ? makeBbox(mapElement.bounds)
            : makeBbox([mapElement.lat, mapElement.lon, mapElement.lat, mapElement.lon]);

        await this.fetchDisplayName(this.meta.bounds.getCenter())
            .then(data => {
                this.meta.display_name = data.display_name;
            });

        // eventually Promise.all this; parallel not serial

        this.meta.timetext = formatDistanceStrict(new Date(this.neu.timestamp), new Date(), {
            addSuffix: true
        });

        this.tagText = this.createTagText();

        // if distance is significantly different from the last distance
        // can we use the LRU in someway here?
            // or rbush knn?
            // put the cache in utils?


        return this;
    }
}

export { Change };
