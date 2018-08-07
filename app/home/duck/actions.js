import types from './types';

function requestBudgets() {
    return {
        type: types.REQUEST_BUDGETS,
    };
}

function receiveBudgets(budgets) {
    return {
        type: types.RECEIVE_BUDGETS,
        budgets,
    };
}

function requestSeasons() {
    return {
        type: types.REQUEST_SEASONS,
    };
}

function receiveSeasons(seasons) {
    return {
        type: types.RECEIVE_SEASONS,
        seasons,
    };
}

function requestBudgetCreate(budget) {
    return {
        type: types.REQUEST_CREATE_BUDGET,
        budget,
    };
}

function receiveBudgetCreate(budget) {
    return {
        type: types.RECEIVE_CREATE_BUDGET,
        budget,
    };
}

export default {
    requestBudgets,
    receiveBudgets,
    requestSeasons,
    receiveSeasons,
    requestBudgetCreate,
    receiveBudgetCreate,
};
