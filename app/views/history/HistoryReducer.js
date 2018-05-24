import {
  HISTORY_PUSH,
  HISTORY_REPLACE,
  HISTORY_GO,
  HISTORY_GO_BACK,
  HISTORY_GO_FORWARD,
  HISTORY_CAN_GO,
} from './HistoryActions';

import {
  getView,
  push,
  pop,
  canGo,
  viewLength,
} from './utils';

const initialState = {
    // men: {
    //   length: null,
    //   currentIndex: null;
    //   history: [],
    // }
    // ...
};

export const defaultView = {
    length: null,
    currentIndex: null,
    undoDisabled: true,
    redoDisabled: true,
    history: [],
};

export default (state = initialState, action) => {
    let view;
    switch (action.type) {
        case HISTORY_PUSH:
        case HISTORY_GO_BACK:
        case HISTORY_GO_FORWARD:
            return {
                ...state,
                [action.view]: {
                    ...action.viewInfo,
                },
            };
        default:
            return state;
    }
};
