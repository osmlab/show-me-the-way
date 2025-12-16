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

import { DiffService } from './diff-service';
import { ChangesetService } from './changeset-service';
import { GeocodeService } from './geocode-service';

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

    // Filter function for processing diffs (cached or fresh)
    const filterAndSort = (data) => {
        return data
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
    };

    // Initialize diff service
    const diffService = new DiffService();

    // Load cached diffs on startup for immediate display
    const cachedDiffs = diffService.getCached();
    if (cachedDiffs.length) {
        queue = filterAndSort(cachedDiffs);
        console.log(`Loaded ${queue.length} changes from cached diffs`);
    }

    // see commit 1e4e19b265247a95a20ab11daec78fcfba1920ff for the logic here
    // in short, if an area is too large (2 degrees) the server response will be slow or error
    // in that case, make a request with no bounds and filter the content client-side
    const requestingBbox = (context.bounds != config.bounds) && isBboxSizeAcceptable(bbox)
        ? makeBboxString(makeBbox(context.bounds)) : null;

    // Start the diff stream
    diffService.start((data) => {
        queue = filterAndSort(data);
    }, requestingBbox);

    // create the maps
    const maps = new Maps(context, bbox);

    // setup the sidebar
    const sidebar = new Sidebar(hashParams, windowLocationObj, context);
    sidebar.initializeEventListeners();

    // Prefetch configuration
    const PREFETCH_COUNT = 3;
    const PREFETCH_DELAY_MS = 1000; // Space out requests to avoid rate limiting
    const prefetchMap = new Map(); // changeKey → Promise<enhancedChange>

    // Get unique key for a raw change item
    function getChangeKey(item) {
        const element = item.neu || item.old;
        return `${item.type}-${element.type}-${element.id}-${element.version}`;
    }

    // Prefetch enhancement for upcoming queue items
    function prefetchUpcoming() {
        // Get next N items from end of queue (they'll be popped next)
        const upcoming = queue.slice(-PREFETCH_COUNT);

        upcoming.forEach((item, index) => {
            const key = getChangeKey(item);
            if (prefetchMap.has(key)) return; // Already prefetching

            // Stagger the requests
            const delay = index * PREFETCH_DELAY_MS;

            const prefetchPromise = new Promise((resolve) => {
                setTimeout(() => {
                    const change = new Change(context, item);
                    change.isRelevant().then((isRelevant) => {
                        if (!isRelevant) {
                            resolve({ change, skip: true });
                            return;
                        }
                        change.enhance()
                            .then(() => resolve({ change, skip: false }))
                            .catch(() => resolve({ change, skip: true }));
                    });
                }, delay);
            });

            prefetchMap.set(key, prefetchPromise);
            console.log(`[Prefetch] Started prefetch for ${key} (delay: ${delay}ms)`);
        });
    }

    function controller() {
        if (queue.length) {
            const item = queue.pop();
            const key = getChangeKey(item);
            ui.updateQueueSize(queue.length);

            // Check if we have a prefetched result
            const prefetched = prefetchMap.get(key);
            if (prefetched) {
                prefetchMap.delete(key);
                console.log(`[Prefetch] Using prefetched result for ${key}`);

                prefetched.then(({ change, skip }) => {
                    if (skip) {
                        controller();
                    } else {
                        ui.update(change);
                        maps.drawMapElement(change, controller);
                    }
                    // Trigger prefetch for next batch
                    prefetchUpcoming();
                });
            } else {
                // No prefetch available, do it synchronously
                const change = new Change(context, item);

                change.isRelevant().then((isRelevant) => {
                    if (isRelevant) {
                        change.enhance().then(() => {
                            ui.update(change);
                            maps.drawMapElement(change, controller);
                            // Trigger prefetch for next batch
                            prefetchUpcoming();
                        }).catch((err) => {
                            console.warn('Skipping change due to enhance failure:', err.message);
                            controller();
                        });
                    } else {
                        controller();
                    }
                });
            }
        } else {
            setTimeout(controller, context.runTime);
        }
    }

    // Start initial prefetch and controller
    prefetchUpcoming();
    controller();
}

function setContext(obj) {
    const comment = obj.comment || config.comment;
    if (comment.length) document.title += ` # ${comment}`;

    const context = Object.assign({}, config, obj);
    context.bounds = context.bounds.split(',');
    context.runTime = 1000 * context.runTime;
    context.debug = context.debug === 'true' || context.debug === true;

    // Initialize services (they handle their own caching and persistence)
    context.changesetService = new ChangesetService();
    context.changesetService.startPersisting();

    context.geocodeService = new GeocodeService();
    context.geocodeService.startPersisting();

    return context;
}

init(window.location);
