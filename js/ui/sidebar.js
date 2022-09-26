class Sidebar {
    constructor(hashParams, windowLocationObj, context) {
        this.hashParams = hashParams;
        this.windowLocationObj = windowLocationObj;
        this.context = context;
        this.application = document.body;
        this.sidebarButton = document.getElementById('sidebar-button');
        this.runTimeElement = document.getElementsByName('runTime')[0];
        this.runTimeElement.value = -1 * this.context.runTime / 1000;
    }

    initializeEventListeners() {
        this.sidebarButton.addEventListener('click', () => {
            this.application.classList.toggle('sidebar-visible');
        });

        this.runTimeElement.addEventListener('change', () => {
            this._updateRuntime(-1 * this.runTimeElement.value);
        });
    }

    _updateRuntime(newRunTime) {
        this.hashParams.set('runTime', newRunTime);
        this.windowLocationObj.hash = '#' + this.hashParams.toString();
        this.context.runTime = newRunTime * 1000;
    }
}

export { Sidebar };
