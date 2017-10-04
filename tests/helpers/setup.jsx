const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;

// const doc = JSDOM.jsdom('<!doctype html><html><body></body></html>');
const win = document.defaultView;

global.document = document;
global.window = win;

function propagateWindowToGlobal(window) {
    Object.keys(window).forEach((key) => {
        if (window[key] && !(key in global)) {
            global[key] = window[key];
        }
    });
}

propagateWindowToGlobal(win);
