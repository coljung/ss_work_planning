import { canGo as canGoUtil, getView, push as pushUtil } from './utils';
import { defaultView } from './HistoryReducer';

export const HISTORY_PUSH = 'HISTORY_PUSH';
export const HISTORY_REPLACE = 'HISTORY_REPLACE';
export const HISTORY_GO = 'HISTORY_GO';
export const HISTORY_GO_BACK = 'HISTORY_GO_BACK';
export const HISTORY_GO_FORWARD = 'HISTORY_GO_FORWARD';
export const HISTORY_CAN_GO = 'HISTORY_CAN_GO';

export const push = (view, viewInfo) => {
  return {
    type: HISTORY_PUSH,
    view,
    viewInfo
  };
}

export const pushAction = (view, item) => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);


    pushUtil(state, viewInfo, item, defaultView);

    dispatch(push(view, viewInfo));

    return item;
};

export const replace = (view, n, item) => {
  return {
    type: HISTORY_REPLACE,
    view,
    n,
    item
  };
}

export const go = (view, n) => {
  return {
    type: HISTORY_GO,
    view,
    n
  };
}

export const goBack = (view, viewInfo) => {
  return {
    type: HISTORY_GO_BACK,
    view,
    viewInfo
  };
}

export const goBackAction = view => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);
    const newIndex = viewInfo.currentIndex - 1;

    if (canGoUtil(state, view, newIndex, defaultView)) {
        const item = viewInfo.history[newIndex];
        viewInfo.currentIndex = newIndex;
        viewInfo.undoDisabled = !canGo(state, view, viewInfo.currentIndex - 1, defaultView);
        viewInfo.redoDisabled = !canGo(state, view, viewInfo.currentIndex + 1, defaultView);

        dispatch(goBack(view, viewInfo));

        return item;
    }
}

export const goForward = (view, viewInfo) => {
  return {
    type: HISTORY_GO_FORWARD,
    view,
    viewInfo
  };
}

export const goForwardAction = view => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);
    const newIndex = viewInfo.currentIndex + 1;

    if (canGoUtil(state, view, newIndex, defaultView)) {
        const item = viewInfo.history[newIndex];
        viewInfo.currentIndex = newIndex;
        viewInfo.undoDisabled = !canGo(state, view, viewInfo.currentIndex - 1, defaultView);
        viewInfo.redoDisabled = !canGo(state, view, viewInfo.currentIndex + 1, defaultView);

        dispatch(goForward(view, viewInfo));

        return item;
    }
}

export const canGo = (view, n) => (_, getState) => {
    const { HistoryReducer: state } = getState();

    return canGoUtil(state, view, n, defaultView);
}
