import { canGo as canGoUtil, getView, push as pushUtil } from './utils';
import { defaultView } from './HistoryReducer';

export const HISTORY_PUSH = 'HISTORY_PUSH';
export const HISTORY_REPLACE = 'HISTORY_REPLACE';
export const HISTORY_GO = 'HISTORY_GO';
export const HISTORY_GO_BACK = 'HISTORY_GO_BACK';
export const HISTORY_GO_FORWARD = 'HISTORY_GO_FORWARD';
export const HISTORY_CAN_GO = 'HISTORY_CAN_GO';
export const HISTORY_GO_DIRECTION_PAST = 'HISTORY_GO_DIRECTION_PAST';
export const HISTORY_GO_DIRECTION_FUTURE = 'HISTORY_GO_DIRECTION_FUTURE';

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

export const replace = (view, n, item) => ({
    type: HISTORY_REPLACE,
    view,
    n,
    item,
});

export const go = (view, n) => ({
    type: HISTORY_GO,
    view,
    n,
});

export const goBack = (view, viewInfo) => ({
    type: HISTORY_GO_BACK,
    view,
    viewInfo,
});

export const goBackAction = view => goInDirection(HISTORY_GO_DIRECTION_PAST, view);

export const goForward = (view, viewInfo) => ({
    type: HISTORY_GO_FORWARD,
    view,
    viewInfo,
});

export const goForwardAction = view => goInDirection(HISTORY_GO_DIRECTION_FUTURE, view);

export const goInDirection = (direction, view) => (dispatch, getState) => {
  const { HistoryReducer: state } = getState();
  const viewInfo = getView(state, view, defaultView);
  let newIndex;

  if (direction === HISTORY_GO_DIRECTION_PAST) {
    newIndex = viewInfo.currentIndex - 1;
  } else {
    newIndex = viewInfo.currentIndex + 1;
  }

  if (canGoUtil(state, view, newIndex, defaultView)) {
      const item = viewInfo.history[newIndex];
      viewInfo.currentIndex = newIndex;
      viewInfo.undoDisabled = !canGoUtil(state, view, newIndex - 1, defaultView);
      viewInfo.redoDisabled = !canGoUtil(state, view, newIndex + 1, defaultView);

      dispatch(goForward(view, viewInfo));

      return item;
  }

  return null;
}

export const canGo = (view, n) => (_, getState) => {
    const { HistoryReducer: state } = getState();

    return canGoUtil(state, view, n, defaultView);
};
