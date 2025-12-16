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

    // Get user params from the url
    const hashParams = new URLSearchParams(windowLocationObj.hash.replace('#', ''));
    const params = Object.fromEntries(hashParams);

    // Override default config with user params where applicable
    const context = setContext(params);

    // Initialize shared state
    let queue = [];
    const bbox = makeBbox(context.bounds);

    // Filter and group changes by changeset for efficient playback
    const filterAndGroup = (data) => {
        const filtered = data
            .filter(happenedToday)
            .filter(userNotIgnored)
            .filter(acceptableType)
            .filter(hasTags)
            .filter(wayLongEnough)
            .filter((change) => withinBbox(change, bbox));

        // Group by changeset id
        const byChangeset = new Map();
        for (const change of filtered) {
            const changesetId = (change.neu || change.old).changeset;
            if (!byChangeset.has(changesetId)) {
                byChangeset.set(changesetId, []);
            }
            byChangeset.get(changesetId).push(change);
        }

        // Flatten back to an array of changes
        const result = Array.from(byChangeset.values()).flat();
        console.log(`[Queue] Grouped ${filtered.length} changes into ${byChangeset.size} changesets`);
        return result;
    };

    // Initialize diff service
    const diffService = new DiffService();

    // Load cached diffs on startup for immediate display
    const cachedDiffs = diffService.getCached();
    if (cachedDiffs.length) {
        queue = filterAndGroup(cachedDiffs);
        console.log(`Loaded ${queue.length} changes from cached diffs`);
    }

    // see commit 1e4e19b265247a95a20ab11daec78fcfba1920ff for the logic here
    // in short, if an area is too large (2 degrees) the server response will be slow or error
    // in that case, make a request with no bounds and filter the content client-side
    const requestingBbox = (context.bounds != config.bounds) && isBboxSizeAcceptable(bbox)
        ? makeBboxString(makeBbox(context.bounds)) : null;

    // Start the diff stream
    diffService.start((data) => {
        queue = filterAndGroup(data);
    }, requestingBbox);

    // Create maps
    const maps = new Maps(context, bbox);

    // Setup the sidebar
    const sidebar = new Sidebar(hashParams, windowLocationObj, context);
    sidebar.initializeEventListeners();

    // Prefetch configuration
    const PREFETCH_COUNT = 3;
    const PREFETCH_DELAY_MS = 1000;
    const prefetchMap = new Map();

    function getChangesetId(item) {
        return (item.neu || item.old).changeset;
    }

    // Prefetch first item of upcoming changesets
    function prefetchUpcoming() {
        const toPrefetch = [];
        const seenChangesets = new Set();

        for (let i = queue.length - 1; i >= 0 && toPrefetch.length < PREFETCH_COUNT; i--) {
            const item = queue[i];
            const changesetId = getChangesetId(item);

            if (!seenChangesets.has(changesetId)) {
                seenChangesets.add(changesetId);
                toPrefetch.push(item);
            }
        }

        toPrefetch.forEach((item, index) => {
            const changesetId = getChangesetId(item);
            if (prefetchMap.has(changesetId)) return; // Already prefetching

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

            prefetchMap.set(changesetId, prefetchPromise);
            console.log(`[Prefetch] Started prefetch for changeset ${changesetId}`);
        });
    }

    function controller() {
        if (queue.length) {
            const item = queue.pop();
            const changesetId = getChangesetId(item);
            ui.updateQueueSize(queue.length);

            // Check if we have a prefetched result for this changeset
            const prefetched = prefetchMap.get(changesetId);
            if (prefetched) {
                prefetchMap.delete(changesetId);
                console.log(`[Prefetch] Using prefetched result for changeset ${changesetId}`);

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
