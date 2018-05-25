import { RECEIVE_BUDGETS,
        REQUEST_BUDGETS,
        REQUEST_SEASONS,
        RECEIVE_SEASONS,
        REQUEST_CREATE_BUDGET,
        RECEIVE_CREATE_BUDGET,
        RESET_SEASONS_VIEW } from './BudgetActions';

const initialState = {
    budgets: [],
    seasons: [],
    budgetsFetched: false,
    seasonsFetched: false,
    budgetCreateFetched: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BUDGETS:
            return Object.assign({}, state, {
                budgetsFetched: false,
            });
        case RECEIVE_BUDGETS:
            return Object.assign({}, state, {
                budgets: action.budgets.data,
                budgetsFetched: true,
            });
        case REQUEST_CREATE_BUDGET:
            return Object.assign({}, state, {
                budgetCreateFetched: false,
            });
        case RECEIVE_CREATE_BUDGET:
            return Object.assign({}, state, {
                budgets: [
                    ...state.budgets,
                    action.budget,
                ],
                budgetCreateFetched: true,
            });
        case REQUEST_SEASONS:
        case RESET_SEASONS_VIEW:
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
