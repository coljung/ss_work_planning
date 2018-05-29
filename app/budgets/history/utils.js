
export const getView = (state, view, defaultView) => (state[view] === undefined ? defaultView : state[view]);

export const viewLength = (view, defaultView) => (view || { history: [] }).history.length;

export const canGo = (view, n, defaultView) => {
    const vLength = viewLength(view, defaultView);

    return n >= 0 && n <= vLength - 1;
};

export const push = (viewInfo, item, defaultView = {}) => {
    if (+viewInfo.currentIndex !== +viewInfo.history.length - 1) {
        viewInfo.history = viewInfo.history.slice(0, viewInfo.currentIndex + 1);
    }

    viewInfo.history.push(item);
    viewInfo.currentIndex = viewInfo.history.length - 1;
    viewInfo.length = viewInfo.history.length;
    viewInfo.undoDisabled = !canGo(viewInfo, viewInfo.currentIndex - 1, defaultView);
    viewInfo.redoDisabled = !canGo(viewInfo, viewInfo.currentIndex + 1, defaultView);

    return viewInfo;
};
