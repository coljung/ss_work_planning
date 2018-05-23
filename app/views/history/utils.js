export const getView = (state, view, defaultView) => state[view] === undefined ? defaultView : state[view];

export const push = (state, view, item, defaultView = {}) => {
    if (+view.currentIndex != +view.history.length - 1) {
        view.history = view.history.slice(0, view.currentIndex);
    }

    view.history.push(item);
    view.currentIndex = view.history.length - 1;
    view.length = view.history.length;
    view.undoDisabled = !canGo(state, view, view.currentIndex - 1, defaultView);
    view.redoDisabled = !canGo(state, view, view.currentIndex + 1, defaultView);

    return view;
};

export const canGo = (state, view, n, defaultView) => {
    const vLength = viewLength(state, view, defaultView);

    return n >= 0 && n <= vLength - 1;
};

export const viewLength = (state, view, defaultView) => getView(state, view, defaultView).history.length;
