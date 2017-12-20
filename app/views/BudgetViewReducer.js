import { RECEIVE_BUDGETS_SAVE_NEW_VERSION,
         REQUEST_BUDGETS_SAVE_BUDGET,
         RECEIVE_BUDGETS_SAVE_BUDGET,
     } from './BudgetViewActions';

const initialState = {
    newVersion: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_BUDGETS_SAVE_NEW_VERSION: {
            return Object.assign({}, state, {
                newVersion: action.version,
            });
        }
        default:
            return state;
    }
};
