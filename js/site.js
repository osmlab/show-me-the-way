"use strict";

import { Change } from './change';
import { Maps } from './maps';
import { Ui } from './ui';

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

function init(windowLocationObj) {
    const ui = new Ui();

    // get user params from the url
    const params = Object.fromEntries(
        new URLSearchParams(windowLocationObj.hash.replace('#', ''))
    );

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
            .filter(change => withinBbox(change, bbox))
            .sort((a, b) => {
                return (+new Date((a.neu && a.neu.timestamp)))
                    - (+new Date((b.neu && b.neu.timestamp)));
            });
    }, null, null, requestingBbox, maxDiffRetries);

    // create the maps
    const maps = new Maps(context, bbox);

    function controller() {
        if (queue.length) {
            const change = new Change(context, queue.pop());
            ui.updateQueueSize(queue.length);

            change.isRelevant().then((isRelevant) => {
                if (isRelevant) {
                    change.enhance().then(() => {
                        ui.update(change);
                        maps.drawMapElement(change, controller);
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
    if (comment.length) document.title += ' #' + comment;

    const context = Object.assign({}, config, obj);
    context.bounds = context.bounds.split(',');
    context.runTime = 1000 * context.runTime;

    context.changesetCache = LRU(50);
    context.geocodeCache = LRU(200);

    return context;
}

init(window.location);
