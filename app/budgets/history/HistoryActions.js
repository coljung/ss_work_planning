import { defaultView } from './HistoryReducer';
import getView from './utils';

export const HISTORY_UNDO = 'HISTORY_UNDO';
export const HISTORY_REDO = 'HISTORY_REDO';
export const HISTORY_PUSH = 'HISTORY_PUSH';

export const historyPush = (view, item) => ({
    type: HISTORY_PUSH,
    view,
    item,
});

export const historyUndo = view => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);
    const previous = viewInfo.past[viewInfo.past.length - 1];

    dispatch({
        type: HISTORY_UNDO,
        view,
    });

    return previous;
};

export const historyRedo = view => (dispatch, getState) => {
    const { HistoryReducer: state } = getState();
    const viewInfo = getView(state, view, defaultView);
    const next = viewInfo.future[0];

    dispatch({
        type: HISTORY_REDO,
        view,
    });

    return next;
};
