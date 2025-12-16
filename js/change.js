import { makeBbox } from './utils';

import { formatDistanceStrict } from 'date-fns';

class Change {
    constructor(context, changeObj) {
        this.context = context;
        Object.assign(this, changeObj);
    }

    async isRelevant() {
        const mapElement = this.neu || this.old;

        if (this.context.comment === "" && !this.context.key) {
            return true;
        }

        const changesetData = await this.context.changesetService.get(mapElement.changeset);

        const commentRelevance =
            this.context.comment !== "" &&
            changesetData.comment?.toLowerCase()
                .includes(this.context.comment.toLowerCase()) || false;

        const keyRelevance = Object.keys(mapElement.tags).includes(this.context.key);

        if (!(commentRelevance || keyRelevance)) {
            console.log(
                "Skipping map element " + mapElement.id
                + " because it didn't match filters."
            );
        }

        return commentRelevance || keyRelevance;
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
            this.context.changesetService.get(this.meta.changeset),
            this.context.geocodeService.get(bounds.getCenter()),
        ]);

        console.log(`Enhance complete in ${Date.now() - startTime}ms`);
        this.meta.comment = changesetData.comment || '';
        this.meta.createdBy = changesetData.created_by || '';
        this.meta.displayName = displayName || '';
        return this;
    }
}

export { Change };
