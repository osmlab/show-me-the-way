import { render } from 'mustache';

class Ui {
    constructor() {
        this.changesetInfo = document.getElementById('changeset_info');
        this.changesetInfo.innerHTML = '<div class="loading">loading...</div>';

        this.changesetTemplate = document.getElementById('changeset-template').innerHTML;
    }

    update(change) {
        this._showComment(change);
        this._showLocation(change);
        this.changesetInfo.innerHTML = render(this.changesetTemplate, change);
    }

    _showComment(change) {
        document.getElementById('comment').textContent = (
            change.meta.comment + ' in ' + change.meta.created_by
        );
    }

    updateQueueSize(numChanges) {
        document.getElementById('queuesize').textContent = numChanges;
    }

    _showLocation(change) {
        document.getElementById('reverse-location').textContent = change.meta.display_name;
    }
}

export { Ui };
