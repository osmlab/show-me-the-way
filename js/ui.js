import { render } from 'mustache';

class Ui {
    constructor() {
        this.changeset_info = document.getElementById('changeset_info');
        this.changeset_info.innerHTML = '<div class="loading">loading...</div>';

        this.changeset_tmpl = document.getElementById('changeset-template').innerHTML;
    }

    update(change) {
        this._showComment(change);
        this._showLocation(change);
        this.changeset_info.innerHTML = render(this.changeset_tmpl, change);
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
