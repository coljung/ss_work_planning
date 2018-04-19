import agent from 'superagent';
import wrap from 'superagent-promise';
import { messages } from 'notifications/NotificationActions';
import getApiUrl from '../Helpers';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VERSIONS = 'REQUEST_BUDGETS_VERSIONS';
export const RECEIVE_BUDGETS_VERSIONS = 'RECEIVE_BUDGETS_VERSIONS';
export const REQUEST_BUDGETS_SAVE_NEW_VERSION = 'REQUEST_BUDGETS_SAVE_NEW_VERSION';
export const RECEIVE_BUDGETS_SAVE_NEW_VERSION = 'RECEIVE_BUDGETS_SAVE_NEW_VERSION';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';

export function requestBudgetVersions() {
    return {
        type: REQUEST_BUDGETS_VERSIONS,
    };
}

export function receiveBudgetVersions(versions) {
    return {
        type: RECEIVE_BUDGETS_VERSIONS,
        versions,
    };
}

export function requestBudgetSaveNewVersion() {
    return {
        type: REQUEST_BUDGETS_SAVE_NEW_VERSION,
    };
}

export function receiveBudgetSaveNewVersion(version) {
    return {
        type: RECEIVE_BUDGETS_SAVE_NEW_VERSION,
        version,
    };
}

export function requestBudgetSave() {
    return {
        type: REQUEST_BUDGETS_SAVE_BUDGET,
    };
}

export function receiveBudgetSave(version) {
    return {
        type: RECEIVE_BUDGETS_SAVE_BUDGET,
        version,
    };
}

export function budgetVersions(budgetId) {
    return (dispatch) => {
        dispatch(requestBudgetVersions());
        return request
            .get(`${getApiUrl()}planning/budgets/${budgetId}/versions`)
            .then(
            (res) => {
                dispatch(receiveBudgetVersions(res.body));
            },
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveNewBudgetVersion(budgetId, versionId) {
    return (dispatch) => {
        dispatch(requestBudgetSaveNewVersion());
        return request
            .post(`${getApiUrl()}planning/budgets/${budgetId}/versions/duplicate`)
            .send({ versionId })
            .then(
            (res) => {
                dispatch(messages({ content: 'New Version Saved successfully!', response: '', isError: false }));
                dispatch(receiveBudgetSaveNewVersion(res.body));
            },
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
