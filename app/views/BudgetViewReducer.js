import { RECEIVE_BUDGETS_SAVE_NEW_VERSION,
         REQUEST_BUDGETS_SAVE_BUDGET,
         RECEIVE_BUDGETS_SAVE_BUDGET,
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
            });
        }
        case RECEIVE_BUDGETS_VERSIONS: {
            return {
                ...state,
                versions: action.versions.data,
            };
        }
        default:
            return state;
    }
};
