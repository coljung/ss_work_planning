import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VERSIONS = 'REQUEST_BUDGETS_VERSIONS';
export const RECEIVE_BUDGETS_VERSIONS = 'RECEIVE_BUDGETS_VERSIONS';
export const REQUEST_BUDGETS_SAVE_NEW_VERSION = 'REQUEST_BUDGETS_SAVE_NEW_VERSION';
export const RECEIVE_BUDGETS_SAVE_NEW_VERSION = 'RECEIVE_BUDGETS_SAVE_NEW_VERSION';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';

function requestBudgetVersions() {
    return {
        type: REQUEST_BUDGETS_VERSIONS,
    };
}

function receiveBudgetVersions(versions) {
    return {
        type: RECEIVE_BUDGETS_VERSIONS,
        versions,
    };
}

function requestBudgetSaveNewVersion() {
    return {
        type: REQUEST_BUDGETS_SAVE_NEW_VERSION,
    };
}

function receiveBudgetSaveNewVersion(version) {
    return {
        type: RECEIVE_BUDGETS_SAVE_NEW_VERSION,
        version,
    };
}

function requestBudgetSave() {
    return {
        type: REQUEST_BUDGETS_SAVE_BUDGET,
    };
}

function receiveBudgetSave(version) {
    return {
        type: RECEIVE_BUDGETS_SAVE_BUDGET,
        version,
    };
}

///api/planning/budgets/8/versions
export function budgetVersions(budgetId) {
  return dispatch => {
    dispatch(requestBudgetVersions());
    return request
        .get(`${getApiUrl()}planning/budgets/${budgetId}/versions`)
        .then(
            res => {
                dispatch(receiveBudgetVersions(res.body));
            },
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
  }
}

export function saveNewBudgetVersion(seasonID, id) {
    return (dispatch) => {
        dispatch(requestBudgetSaveNewVersion());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .post(`${getApiUrl()}planning/seasons/${seasonID}/versions/${id}/duplicate`)
            .then(
                res => {
                    dispatch(messages({ content: 'New Version Saved successfully!', response: '', isError: false }));
                    dispatch(receiveBudgetSaveNewVersion(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveBudget(budget, id, view, data) {
    return (dispatch) => {
        dispatch(requestBudgetSave());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .post(`${getApiUrl()}planning/budgets/${budget}/versions/${id}/${view}`)
            .send(data)
            .then(
                res => {
                    dispatch(messages({ content: 'Budget Saved successfully!', response: '', isError: false }));
                    dispatch(receiveBudgetSave(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}


// ${getApiUrl()}planning/budgets/143/versions/1/man
