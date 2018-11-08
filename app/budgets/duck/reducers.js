import types from './types';
import { LOGOUT_SUCCESS } from '../../user/duck/types';

export const initialState = {
    config: {},
    filters: {
        availableMetrics: [],
        availablePlans: [],
        selectedPlanTypes: [],
        selectedMetrics: [],
    },
    isBudgetLoading: false,
    isDataSpreading: false,
    isRefreshRequired: false,
    isFullRefreshRequired: false,
    view: null,
    viewData: {
        season: '',
        budgetYear: '',
        years: [],
    },
};

const budgetViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return initialState;
        case types.RECEIVE_BUDGETS_CONFIG_DATA:
            return {
                ...state,
                config: action.result,
            };

        case types.REQUEST_BUDGETS_DATA:
            return {
                ...state,
                isBudgetLoading: true,
                isRefreshRequired: false,
                isFullRefreshRequired: false,
            };

        case types.RECEIVE_BUDGETS_DATA:
            return {
                ...state,
                isBudgetLoading: false,
                view: action.view,
                viewData: action.result,
            };

        case types.REQUEST_SPREAD_DATA:
            return {
                ...state,
                isDataSpreading: true,
            };

        case types.RECEIVE_SPREAD_DATA:
        case types.FAILED_SPREAD_DATA:
            return {
                ...state,
                isDataSpreading: false,
                isRefreshRequired: true,
            };

        case types.RECEIVE_SAVE_PLAN:
        case types.FAILED_SAVE_PLAN:
            return {
                ...state,
                isFullRefreshRequired: true,
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
