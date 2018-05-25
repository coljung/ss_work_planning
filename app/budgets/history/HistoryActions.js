import { canGo as canGoUtil, getView, push as pushUtil } from './utils';
import { defaultView } from './HistoryReducer';

export const HISTORY_PUSH = 'HISTORY_PUSH';
export const HISTORY_GO_BACK = 'HISTORY_GO_BACK';
export const HISTORY_GO_FORWARD = 'HISTORY_GO_FORWARD';
export const HISTORY_CAN_GO = 'HISTORY_CAN_GO';

export const push = (view, viewInfo) => ({
    type: HISTORY_PUSH,
    view,
    viewInfo,
});

export const pushAction = (view, item) => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);

    pushUtil(state, viewInfo, item, defaultView);

    dispatch(push(view, viewInfo));

    return item;
};

export const go = (type, view, viewInfo) => ({
    type,
    view,
    viewInfo,
});

export const goInDirection = (direction, view) => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);
    let newIndex;

    if (direction === HISTORY_GO_BACK) {
        newIndex = viewInfo.currentIndex - 1;
    } else {
        newIndex = viewInfo.currentIndex + 1;
    }

    if (canGoUtil(state, view, newIndex, defaultView)) {
        const item = viewInfo.history[newIndex];
        viewInfo.currentIndex = newIndex;
        viewInfo.undoDisabled = !canGoUtil(state, view, newIndex - 1, defaultView);
        viewInfo.redoDisabled = !canGoUtil(state, view, newIndex + 1, defaultView);

        dispatch(go(direction, view, viewInfo));

        return item;
    }

    return null;
};

export const goBack = (view, viewInfo) => ({
    type: HISTORY_GO_BACK,
    view,
    viewInfo,
});

export const goBackAction = view => goInDirection(HISTORY_GO_BACK, view);

export const goForward = (view, viewInfo) => ({
    type: HISTORY_GO_FORWARD,
    view,
    viewInfo,
});

export const goForwardAction = view => goInDirection(HISTORY_GO_FORWARD, view);

export const canGo = (view, n) => (_, getState) => {
    const { HistoryReducer: state } = getState();

    return canGoUtil(state, view, n, defaultView);
};
