import { RECEIVE_BUDGETS_SAVE_NEW_VERSION,
         RECEIVE_BUDGETS_VERSIONS,
     } from './BudgetViewActions';

const initialState = {
    newVersion: null,
    versions: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_BUDGETS_SAVE_NEW_VERSION: {
            return Object.assign({}, state, {
                newVersion: action.version,
                versions: [action.version, ...state.versions],
            });
        }
        case RECEIVE_BUDGETS_VERSIONS: {
            return {
                ...state,
                versions: action.versions,
            };
        }
        default:
            return state;
    }
};
