import { Change } from './change';
import { Maps } from './maps';
import { Ui } from './ui';
import { Sidebar } from './ui/sidebar';

import { config } from './config';

import {
    makeBbox,
    makeBboxString,
    isBboxSizeAcceptable
} from './utils';

import {
    happenedToday,
    userNotIgnored,
    acceptableType,
    hasTags,
    wayLongEnough,
    withinBbox
} from './filters';

import osmStream from 'osm-stream';
import LRU from 'lru-cache';

const STORAGE_KEYS = {
    changesets: 'smtw-changesets',
    geocodes: 'smtw-geocodes'
};

const CACHE_SIZES = {
    changesets: 500,
    geocodes: 2000
};

const PERSIST_INTERVAL_MS = 30000;

function loadCacheFromStorage(key, maxSize) {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            const cache = LRU(maxSize);
            cache.load(JSON.parse(stored));
            console.log(`Loaded ${cache.length} entries from ${key}`);
            return cache;
        }
    } catch (err) {
        console.warn(`Failed to load cache from ${key}:`, err.message);
    }
    return LRU(maxSize);
}

function saveCacheToStorage(cache, key) {
    try {
        const data = JSON.stringify(cache.dump());
        localStorage.setItem(key, data);
    } catch (err) {
        console.warn(`Failed to save cache to ${key}:`, err.message);
    }
}

function setupCachePersistence(context) {
    const persistCaches = () => {
        saveCacheToStorage(context.changesetCache, STORAGE_KEYS.changesets);
        saveCacheToStorage(context.geocodeCache, STORAGE_KEYS.geocodes);
    };

    // Persist every 30 seconds
    setInterval(persistCaches, PERSIST_INTERVAL_MS);

    // Persist on page unload
    window.addEventListener('beforeunload', persistCaches);
}

function init(windowLocationObj) {
    const ui = new Ui();

    // get user params from the url
    const hashParams = new URLSearchParams(windowLocationObj.hash.replace('#', ''));
    const params = Object.fromEntries(hashParams);

    // override default config with user params where applicable
    const context = setContext(params);

    // initialize shared state
    let queue = [];
    const bbox = makeBbox(context.bounds);

    // see commit 1e4e19b265247a95a20ab11daec78fcfba1920ff for the logic here
    // in short, if an area is too large (2 degrees) the server response will be slow or error
    // in that case, make a request with no bounds and filter the content client-side
    const requestingBbox = (context.bounds != config.bounds) && isBboxSizeAcceptable(bbox)
        ? makeBboxString(makeBbox(context.bounds)) : null;

    // start the data loop
    const maxDiffRetries = 2;
    osmStream.runFn((err, data) => {
        queue = data
            .filter(happenedToday)
            .filter(userNotIgnored)
            .filter(acceptableType)
            .filter(hasTags)
            .filter(wayLongEnough)
            .filter((change) => withinBbox(change, bbox))
            .sort((a, b) => {
                return (+new Date((a.neu && a.neu.timestamp)))
                    - (+new Date((b.neu && b.neu.timestamp)));
            });
    }, null, null, requestingBbox, maxDiffRetries);

    // create the maps
    const maps = new Maps(context, bbox);

    // setup the sidebar
    const sidebar = new Sidebar(hashParams, windowLocationObj, context);
    sidebar.initializeEventListeners();

    function controller() {
        if (queue.length) {
            const change = new Change(context, queue.pop());
            ui.updateQueueSize(queue.length);

            change.isRelevant().then((isRelevant) => {
                if (isRelevant) {
                    change.enhance().then(() => {
                        ui.update(change);
                        maps.drawMapElement(change, controller);
                    }).catch((err) => {
                        console.warn('Skipping change due to enhance failure:', err.message);
                        controller();
                    });
                } else {
                    controller();
                }
            });
        } else {
            setTimeout(controller, context.runTime);
        }
    }

    // start the loop
    controller();
}

function setContext(obj) {
    const comment = obj.comment || config.comment;
    if (comment.length) document.title += ` # ${comment}`;

    const context = Object.assign({}, config, obj);
    context.bounds = context.bounds.split(',');
    context.runTime = 1000 * context.runTime;
    context.debug = context.debug === 'true' || context.debug === true;

    // Load caches from localStorage if available, with expanded capacity
    context.changesetCache = loadCacheFromStorage(STORAGE_KEYS.changesets, CACHE_SIZES.changesets);
    context.geocodeCache = loadCacheFromStorage(STORAGE_KEYS.geocodes, CACHE_SIZES.geocodes);

    // Set up periodic persistence
    setupCachePersistence(context);

    return context;
}

init(window.location);
