import {
         RECEIVE_BUDGETS_VERSIONS,
         RECEIVE_BUDGETS_CONFIG_DATA,
         REQUEST_BUDGETS_VIEW,
         RECEIVE_BUDGETS_VIEW,
         REQUEST_REFRESH_GRID_DATA,
         RECEIVE_REFRESH_GRID_DATA,
         RECEIVE_BUDGETS_SAVE_NEW_VERSION,
     } from './BudgetViewActions';

const initialState = {
    config: {},
    budgetLoading: false,
    spreadingRunning: false,
    loading: false,
    newVersion: null,
    refreshData: false,
    versions: [],
    viewData: [],
    view: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_BUDGETS_VERSIONS:
            return Object.assign({}, state, {
                versions: action.versions.data,
            });
        case RECEIVE_BUDGETS_CONFIG_DATA:
            return Object.assign({}, state, {
                config: action.config,
            });
        case REQUEST_BUDGETS_VIEW:
            return Object.assign({}, state, {
                viewData: [],
                budgetLoading: true,
                refreshData: false,
                loading: true,
                view: null,
            });
        case RECEIVE_BUDGETS_VIEW: {
            const setData = [];
            setData[action.view] = action.viewData;
            return Object.assign({}, state, {
                viewData: setData,
                budgetLoading: false,
                refreshData: false,
                loading: false,
                view: action.view,
            });
        }
        case REQUEST_REFRESH_GRID_DATA:
            return Object.assign({}, state, {
                refreshData: false,
                spreadingData: true,
                loading: true,
            });
        case RECEIVE_REFRESH_GRID_DATA:
            return Object.assign({}, state, {
                refreshData: true,
                spreadingData: false,
                loading: false,
            });
        case RECEIVE_BUDGETS_SAVE_NEW_VERSION:
            return Object.assign({}, state, {
                newVersion: action.version,
            });
        default:
            return state;
    }
};
