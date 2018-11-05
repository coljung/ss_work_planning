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

function fetchBudgetMetricData(budget, view) {
    return {
        types: [types.REQUEST_BUDGETS_DATA, types.RECEIVE_BUDGETS_DATA, types.FAILED_BUDGETS_DATA],
        promise: client => client.get(`/planning/budgets/${budget}/${view}`),
        view,
    };
}

function sendDataForSpreading(budgetId, view, updatedObj) {
    const body = {
        key: updatedObj.key,
        value: updatedObj.value === 0 ? 0.0001 : updatedObj.value,
        metric: updatedObj.metric,
        origin: updatedObj.origin,
        associatedKey: updatedObj.associatedKey,
    };

    return {
        types: [types.REQUEST_SPREAD_DATA, types.RECEIVE_SPREAD_DATA, types.FAILED_SPREAD_DATA],
        promise: client => client.put(`/planning/budgets/${budgetId}/${view}`, { body }),
        view,
    };
}

function filterSetup(filters) {
    return {
        type: types.SET_FILTER_SETUP,
        filters,
    };
}

function savePlan(planType, budgetId) {
    return {
        types: [types.REQUEST_SAVE_PLAN, types.RECEIVE_SAVE_PLAN, types.FAILED_SAVE_PLAN],
        promise: client => client.post('/planning/budgets/save', { body: { planType, budgetId } }),
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
    savePlan,
    resetState,
};
