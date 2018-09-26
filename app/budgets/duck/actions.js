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

function fetchBudgetConfigData() {
    return {
        types: [types.REQUEST_BUDGETS_CONFIG_DATA, types.RECEIVE_BUDGETS_CONFIG_DATA, types.FAILED_BUDGETS_CONFIG_DATA],
        promise: client => client.get('/planning/config'),
    };
}

function fetchBudgetMetricData(budget, view, filters) {
    // console.log('View from action----', view);
    return {
        types: [types.REQUEST_BUDGETS_DATA, types.RECEIVE_BUDGETS_DATA, types.FAILED_BUDGETS_DATA],
        promise: client => client.get(`/planning/budgets/${budget}/${view}`),
        view,
        filters,
    };
}

function sendDataForSpreading(budget, view, updatedObj) {
    const body = {
        ...updatedObj,
        value: updatedObj.value === 0 ? 0.0001 : updatedObj.value,
    };

    return {
        types: [types.REQUEST_SPREAD_DATA, types.RECEIVE_SPREAD_DATA, types.FAILED_SPREAD_DATA],
        promise: client => client.put(`/planning/budgets/${budget}/${view}`, { body }),
        view,
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
    fetchBudgetConfigData,
    fetchBudgetMetricData,
    sendDataForSpreading,
    filterSetup,
    resetState,
};
