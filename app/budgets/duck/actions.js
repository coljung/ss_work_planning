import types from './types';

function requestViewDownload(budgetId, view, filter) {
    return {
        type: types.REQUEST_VIEW_DOWNLOAD,
        budgetId,
        view,
        metrics: filter.metrics,
        plans: filter.plans,
    };
}

function requestBudgetConfigData() {
    return {
        type: types.REQUEST_BUDGETS_CONFIG_DATA,
    };
}

function receiveBudgetConfigData(config) {
    return {
        type: types.RECEIVE_BUDGETS_CONFIG_DATA,
        config,
    };
}

function requestBudgetViewData() {
    return {
        type: types.REQUEST_BUDGETS_DATA,
    };
}

function receiveBudgetViewData(viewData, view) {
    return {
        type: types.RECEIVE_BUDGETS_DATA,
        viewData,
        view,
    };
}

function requestSendDataForSpreading() {
    return {
        type: types.REQUEST_SPREAD_DATA,
    };
}

function receiveSendDataForSpreading() {
    return {
        type: types.RECEIVE_SPREAD_DATA,
    };
}

function filterSetup(filters) {
    return {
        type: types.SET_FILTER_SETUP,
        filters,
    };
}

function resetState() {
    return {
        type: types.RESET_BUDGETS_DATA,
    };
}

export default {
    requestViewDownload,
    requestBudgetConfigData,
    receiveBudgetConfigData,
    requestBudgetViewData,
    receiveBudgetViewData,
    requestSendDataForSpreading,
    receiveSendDataForSpreading,
    filterSetup,
    resetState,
};
