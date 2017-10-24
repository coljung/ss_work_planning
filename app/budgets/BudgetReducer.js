import { RECEIVE_BUDGETS,
        REQUEST_BUDGETS,
        REQUEST_SEASONS,
        RECEIVE_SEASONS } from './BudgetActions';

const initialState = {
    budgets: [],
    seasons: [],
    budgetsFetched: false,
    seasonsFetched: false,
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
        case REQUEST_SEASONS:
            return Object.assign({}, state, {
                seasonsFetched: false,
            });
        case RECEIVE_SEASONS:
            return Object.assign({}, state, {
                seasons: action.seasons,
                seasonsFetched: true,
            });
        default:
            return state;
    }
};
