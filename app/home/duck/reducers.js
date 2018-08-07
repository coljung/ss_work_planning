import types from './types';

const initialState = {
    budgets: [],
    seasons: [],
    budgetsFetched: false,
    seasonsFetched: false,
    budgetCreateFetched: true,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_BUDGETS:
            return Object.assign({}, state, {
                budgetsFetched: false,
            });

        case types.RECEIVE_BUDGETS:
            return Object.assign({}, state, {
                budgets: action.budgets,
                budgetsFetched: true,
            });

        case types.REQUEST_CREATE_BUDGET:
            return Object.assign({}, state, {
                budgetCreateFetched: false,
            });

        case types.RECEIVE_CREATE_BUDGET:
            return Object.assign({}, state, {
                budgets: [
                    ...state.budgets,
                    action.budget,
                ],
                budgetCreateFetched: true,
            });

        case types.REQUEST_SEASONS:
            return Object.assign({}, state, {
                seasonsFetched: false,
            });

        case types.RECEIVE_SEASONS:
            return Object.assign({}, state, {
                seasons: action.seasons,
                seasonsFetched: true,
            });

        default:
            return state;
    }
};

export default homeReducer;
