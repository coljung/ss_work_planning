import { RECEIVE_BUDGETS, REQUEST_BUDGETS } from './BudgetActions';

const initialState = {
    budgets: [],
    budgetsFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BUDGETS:
            return Object.assign({}, state, {
                budgetsFetched: false,
            });
        case RECEIVE_BUDGETS:
            return Object.assign({}, state, {
                budgets: action.budgets,
                budgetsFetched: true,
            });
        default:
            return state;
    }
};
