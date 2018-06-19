import {
         RECEIVE_BUDGETS_VERSIONS,
         RECEIVE_BUDGETS_CONFIG_DATA,
         REQUEST_BUDGETS_DATA,
         RECEIVE_BUDGETS_DATA,
         REQUEST_SPREAD_DATA,
         RECEIVE_SPREAD_DATA,
         REQUEST_BUDGETS_SAVE_NEW_VERSION,
         RECEIVE_BUDGETS_SAVE_NEW_VERSION,
         SET_TRIGGER_CHANGE,
         RESET_BUDGETS_DATA,
     } from './BudgetViewActions';

const initialState = {
    config: {},
    isBudgetLoading: false,
    isDataSpreading: false,
    isRefreshRequired: false,
    newVersion: null,
    versions: [],
    view: null,
    viewData: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_BUDGETS_VERSIONS:
            return {
                ...state,
                versions: action.versions.data,
            };
        case RECEIVE_BUDGETS_CONFIG_DATA:
            return Object.assign({}, state, {
                config: action.config,
            });
        case REQUEST_BUDGETS_DATA:
            return Object.assign({}, state, {
                // view: null, // not sure if required here
                isBudgetLoading: true,
                isRefreshRequired: false,
                viewData: [],
            });
        case RECEIVE_BUDGETS_DATA: {
            const setData = [];
            setData[action.view] = action.viewData;
            return Object.assign({}, state, {
                isBudgetLoading: false,
                view: action.view,
                viewData: setData,
            });
        }
        case REQUEST_SPREAD_DATA:
            return Object.assign({}, state, {
                isBudgetLoading: false,
                isDataSpreading: true,
            });
        case RECEIVE_SPREAD_DATA:
            return Object.assign({}, state, {
                isBudgetLoading: true,
                isDataSpreading: false,
                isRefreshRequired: true,
            });
        case RECEIVE_BUDGETS_SAVE_NEW_VERSION:
            return Object.assign({}, state, {
                isRefreshRequired: true,
                newVersion: action.version,
                versions: [action.version, ...state.versions],
            });
        case SET_TRIGGER_CHANGE:
            return Object.assign({}, state, {
                isRefreshRequired: true,
            });
        case RESET_BUDGETS_DATA:
            return initialState;
        default:
            return state;
    }
};
