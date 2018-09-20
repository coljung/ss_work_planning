import types from './types';
import { LOGOUT_SUCCESS } from '../../user/duck/types';

const initialState = {
    budgets: [],
    seasons: [],
    budgetsFetched: false,
    seasonsFetched: false,
    budgetCreateFetched: true,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return initialState;
        case types.REQUEST_BUDGETS:
            return {
                ...state,
                budgetsFetched: false,
            };

        case types.RECEIVE_BUDGETS:
            return {
                ...state,
                budgets: action.result,
                budgetsFetched: true,
            };

        case types.REQUEST_CREATE_BUDGET:
            return {
                ...state,
                budgetCreateFetched: false,
            };

        case types.RECEIVE_CREATE_BUDGET:
            return {
                ...state,
                budgets: [
                    ...state.budgets,
                    action.result,
                ],
                budgetCreateFetched: true,
            };

        case types.REQUEST_SEASONS:
            return {
                ...state,
                seasonsFetched: false,
            };

        case types.RECEIVE_SEASONS:
            return {
                ...state,
                seasons: action.result,
                seasonsFetched: true,
            };

        default:
            return state;
    }
};

export default homeReducer;
