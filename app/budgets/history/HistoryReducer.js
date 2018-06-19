import { HISTORY_UNDO, HISTORY_REDO, HISTORY_PUSH } from './HistoryActions';
import { CLEAR_GLOBAL_DATA } from '../../components/customNavigation/CustomNavigationActions';

import { getView, push, pop, canGo, viewLength } from './utils';

const initialState = {
    // men: {
    //   past: Array<T>,
    //   present: T,
    //   future: Array<T>
    // }
    // ...
};

export const defaultView = {
    past: [],
    present: null,
    future: [],
};

export default (state = initialState, action) => {
    const { view } = action;
    const viewInfo = getView(state, view, defaultView);
    const { past, present, future } = viewInfo;

    switch (action.type) {
        case HISTORY_UNDO: {
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            return {
                ...state,
                [view]: {
                    past: newPast,
                    present: previous,
                    future: [present, ...future],
                },
            };
        }
        case HISTORY_REDO: {
            const next = future[0];
            const newFuture = future.slice(1);
            return {
                ...state,
                [view]: {
                    past: [...past, present],
                    present: next,
                    future: newFuture,
                },
            };
        }
        case HISTORY_PUSH: {
            const newPresent = action.item;
            if (present === newPresent) {
                return state;
            }

            return {
                ...state,
                [view]: {
                    past: present ? [...past, present] : [...past],
                    present: newPresent,
                    future: [],
                },
            };
        }
        case CLEAR_GLOBAL_DATA:
            return defaultView;
        default:
            return state;
    }
};
