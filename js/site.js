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

        // Sort by size: smallest first, largest last (so largest get popped first)
        const sortedGroups = Array.from(byChangeset.values())
            .sort((a, b) => a.length - b.length);

        const result = sortedGroups.flat();
        console.log(`[Queue] Grouped ${filtered.length} changes into ${byChangeset.size} changesets (largest: ${sortedGroups[sortedGroups.length - 1]?.length || 0} items)`);
        return result;
    };

    // Initialize diff service and load cached diffs
    const diffService = new DiffService();

    // see commit 1e4e19b265247a95a20ab11daec78fcfba1920ff for the logic here
    // in short, if an area is too large (2 degrees) the server response will be slow or error
    // in that case, make a request with no bounds and filter the content client-side
    const requestingBbox = (context.bounds != config.bounds) && isBboxSizeAcceptable(bbox)
        ? makeBboxString(makeBbox(context.bounds)) : null;

    // Track visibility state for pause/resume
    let isPaused = false;
    let isProcessing = false;

    const onDiffData = (data) => {
        queue.unshift(...filterAndGroup(data));
    };

    // Initialize IndexedDB and load cached diffs, then start streaming
    diffService.init().then(() => {
        const cachedDiffs = diffService.getCached();
        if (cachedDiffs.length) {
            queue = filterAndGroup(cachedDiffs);
            console.log(`Loaded ${queue.length} changes from cached diffs`);
        }
    }).catch((err) => {
        console.warn('[DiffService] Init failed, starting without cache:', err);
    }).finally(() => {
        diffService.start(onDiffData, requestingBbox);
    });

    // Pause/resume based on page visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('[Visibility] Tab hidden - pausing stream and processing');
            isPaused = true;
            diffService.stop();
        } else {
            console.log('[Visibility] Tab visible - resuming stream and processing');
            isPaused = false;
            diffService.start(onDiffData, requestingBbox);
            // Restart processing loop if it's not already running
            if (!isProcessing) {
                processNextChange();
            }
        }
    });

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

    // Get approximate center coordinates from raw queue item
    function getItemCenter(item) {
        const mapElement = item.neu || item.old;
        if (mapElement.type === 'way' && mapElement.bounds) {
            // Way with bounds - use center of bounds
            const [south, west, north, east] = mapElement.bounds;
            return { lat: (south + north) / 2, lng: (west + east) / 2 };
        } else if (mapElement.lat !== undefined && mapElement.lon !== undefined) {
            // Node with coordinates
            return { lat: mapElement.lat, lng: mapElement.lon };
        }
        return null;
    }

    // Calculate distance between two points in meters (Haversine)
    function getDistance(p1, p2) {
        const R = 6371000;
        const lat1 = p1.lat * Math.PI / 180;
        const lat2 = p2.lat * Math.PI / 180;
        const dLat = (p2.lat - p1.lat) * Math.PI / 180;
        const dLng = (p2.lng - p1.lng) * Math.PI / 180;

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }

    // Find nearby items from the same changeset for batch drawing
    // Returns array of items to batch (including the first item)
    function findBatchItems(firstItem, firstCenter) {
        const changesetId = getChangesetId(firstItem);
        const batch = [firstItem];
        const maxBatchSize = 15;
        const maxDistance = 1000; // 1km

        // Look through queue from end (where we pop from)
        for (let i = queue.length - 1; i >= 0 && batch.length < maxBatchSize; i--) {
            const item = queue[i];
            if (getChangesetId(item) !== changesetId) continue;

            const center = getItemCenter(item);
            if (!center) continue;

            // Check if within 1km of the first item
            if (getDistance(firstCenter, center) <= maxDistance) {
                batch.push(item);
                queue.splice(i, 1); // Remove from queue
            }
        }

        return batch;
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
            if (context.changesetService.cache.has(changesetId)) return; // Already cached

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

    function processNextChange() {
        // Don't process while tab is hidden
        if (isPaused) {
            isProcessing = false;
            return;
        }

        isProcessing = true;

        if (queue.length) {
            const item = queue.pop();
            const changesetId = getChangesetId(item);
            const itemCenter = getItemCenter(item);
            ui.updateQueueSize(queue.length);

            // Check if we can batch with nearby items from same changeset
            const MIN_BATCH_SIZE = 5;
            let batchItems = [item];

            if (context.multi && itemCenter && queue.length >= MIN_BATCH_SIZE - 1) {
                batchItems = findBatchItems(item, itemCenter);
            }

            if (batchItems.length >= MIN_BATCH_SIZE) {
                // Batch mode: enhance all items and draw simultaneously
                console.log(`[Batch] Processing ${batchItems.length} nearby changes from changeset ${changesetId}`);
                ui.updateQueueSize(queue.length);

                const enhancePromises = batchItems.map(async (batchItem) => {
                    const change = new Change(context, batchItem);
                    const isRelevant = await change.isRelevant();
                    if (!isRelevant) return null;
                    try {
                        await change.enhance();
                        return change;
                    } catch (err) {
                        console.warn('Skipping batch item due to enhance failure:', err.message);
                        return null;
                    }
                });

                Promise.all(enhancePromises).then((changes) => {
                    const validChanges = changes.filter((c) => c !== null);
                    if (validChanges.length >= MIN_BATCH_SIZE) {
                        // Show info for first change in batch
                        ui.update(validChanges[0]);
                        maps.drawMapElementBatch(validChanges, processNextChange);
                    } else if (validChanges.length > 0) {
                        // Not enough valid changes for batch, draw individually
                        ui.update(validChanges[0]);
                        maps.drawMapElement(validChanges[0], processNextChange);
                    } else {
                        processNextChange();
                    }
                    prefetchUpcoming();
                });
            } else {
                // Single item mode (original behavior)
                const prefetched = prefetchMap.get(changesetId);
                if (prefetched) {
                    prefetchMap.delete(changesetId);
                    console.log(`[Prefetch] Using prefetched result for changeset ${changesetId}`);

                    prefetched.then(({ change, skip }) => {
                        if (skip) {
                            processNextChange();
                        } else {
                            ui.update(change);
                            maps.drawMapElement(change, processNextChange);
                        }
                        prefetchUpcoming();
                    });
                } else {
                    const change = new Change(context, item);

                    change.isRelevant().then((isRelevant) => {
                        if (isRelevant) {
                            change.enhance().then(() => {
                                ui.update(change);
                                maps.drawMapElement(change, processNextChange);
                                prefetchUpcoming();
                            }).catch((err) => {
                                console.warn('Skipping change due to enhance failure:', err.message);
                                processNextChange();
                            });
                        } else {
                            processNextChange();
                        }
                    });
                }
            }
        } else {
            ui.showLoading();
            isProcessing = false; // Not actively processing, waiting for data
            setTimeout(processNextChange, context.runTime);
        }
    }

    // Start initial prefetch and playback
    prefetchUpcoming();
    processNextChange();
}

function setContext(obj) {
    const comment = obj.comment || config.comment;
    if (comment.length) document.title += ` # ${comment}`;

    const context = Object.assign({}, config, obj);
    context.bounds = context.bounds.split(',');
    context.runTime = 1000 * context.runTime;
    context.multi = context.multi === 'true' || context.multi === true;
    context.debug = context.debug === 'true' || context.debug === true;

    context.changesetService = new ChangesetService();
    context.changesetService.startPersisting();

    context.geocodeService = new GeocodeService();
    context.geocodeService.startPersisting();

    return context;
}

init(window.location);
