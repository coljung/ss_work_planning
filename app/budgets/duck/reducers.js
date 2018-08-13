import types from './types';

const initialState = {
    config: {},
    filters: { available_metrics: [], available_plans: [] },
    isBudgetLoading: false,
    isDataSpreading: false,
    isRefreshRequired: false,
    view: null,
    viewData: {
        data: [],
        headers: [],
        info: {},
    },
};

const budgetViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.RECEIVE_BUDGETS_CONFIG_DATA:
            return {
                ...state,
                config: action.config,
            };

        case types.REQUEST_BUDGETS_DATA:
            return {
                ...state,
                isBudgetLoading: true,
                isRefreshRequired: false,
            };

        case types.RECEIVE_BUDGETS_DATA:
            return {
                ...state,
                isBudgetLoading: false,
                view: action.view,
                viewData: action.viewData,
            };

        case types.REQUEST_SPREAD_DATA:
            return {
                ...state,
                isDataSpreading: true,
            };

        case types.RECEIVE_SPREAD_DATA:
            return {
                ...state,
                isDataSpreading: false,
                isRefreshRequired: true,
            };

        case types.SET_FILTER_SETUP:
            return {
                ...state,
                filters: action.filters,
            };

        case types.RESET_BUDGETS_DATA:
            return initialState;

        default:
            return state;
    }
};

export default budgetViewReducer;
