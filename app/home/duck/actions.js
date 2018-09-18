import types from './types';

function fetchAvailableSeasons() {
    return {
        types: [types.REQUEST_SEASONS, types.RECEIVE_SEASONS, types.FAILED_SEASONS],
        promise: client => client.get('/planning/budgets/show/available'),
    };
}

function fetchBudgets() {
    return {
        types: [types.REQUEST_BUDGETS, types.RECEIVE_BUDGETS, types.FAILED_BUDGETS],
        promise: client => client.get('/planning/budgets'),
    };
}

function createBudget(budget) {
    return {
        types: [types.REQUEST_CREATE_BUDGET, types.RECEIVE_CREATE_BUDGET, types.FAILED_CREATE_BUDGET],
        promise: client => client.post('/planning/budgets', { body: budget }),
    };
}

export default {
    fetchAvailableSeasons,
    fetchBudgets,
    createBudget,
};
