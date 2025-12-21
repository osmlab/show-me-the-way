import Mustache from 'mustache';

class Ui {
    constructor() {
        this.changesetInfo = document.getElementById('changeset_info');
        this.changesetTemplate = document.getElementById('changeset-template').innerHTML;
        this.loading = document.getElementById('loading');
        this.overlays = document.querySelectorAll('.overlay');
    }

    update(change) {
        this.loading.classList.add('fade-out');
        this.overlays.forEach((overlay) => {
            overlay.classList.add('fade-in');
        });

        this._updateComment(change);
        this._updateLocation(change);
        this.changesetInfo.innerHTML = Mustache.render(this.changesetTemplate, change);
    }

    showLoading() {
        this.loading.classList.remove('fade-out');
        this.overlays.forEach((overlay) => {
            overlay.classList.remove('fade-in');
        });
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
        const locationEl = document.getElementById('reverse-location');
        if (change.meta.displayName) {
            locationEl.textContent = change.meta.displayName;
            locationEl.style.display = '';
        } else {
            locationEl.style.display = 'none';
        }
    }
}

export { Ui };
