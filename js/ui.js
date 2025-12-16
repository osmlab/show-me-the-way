import Mustache from 'mustache';

class Ui {
    constructor() {
        this.changesetInfo = document.getElementById('changeset_info');
        this.changesetTemplate = document.getElementById('changeset-template').innerHTML;
    }

    update(change) {
        document.getElementById('loading').classList.add('fade-out');
        document.querySelectorAll('.overlay').forEach((overlay) => {
            overlay.classList.add('fade-in');
        });

        this._updateComment(change);
        this._updateLocation(change);
        this.changesetInfo.innerHTML = Mustache.render(this.changesetTemplate, change);
    }

    _updateComment(change) {
        document.getElementById('comment').textContent = (
            change.meta.comment + ' in ' + change.meta.createdBy
        );
    }

    updateQueueSize(numChanges) {
        document.getElementById('queuesize').textContent = numChanges;
    }

    _updateLocation(change) {
        document.getElementById('reverse-location').textContent = change.meta.displayName;
    }
}

export { Ui };
