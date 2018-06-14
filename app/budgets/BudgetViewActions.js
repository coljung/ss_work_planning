import agent from 'superagent';
import wrap from 'superagent-promise';
import { messages } from 'notifications/NotificationActions';
import getApiUrl from '../Helpers';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VERSIONS = 'REQUEST_BUDGETS_VERSIONS';
export const RECEIVE_BUDGETS_VERSIONS = 'RECEIVE_BUDGETS_VERSIONS';
export const REQUEST_BUDGETS_CONFIG_DATA = 'REQUEST_BUDGETS_CONFIG_DATA';
export const RECEIVE_BUDGETS_CONFIG_DATA = 'RECEIVE_BUDGETS_CONFIG_DATA';
export const REQUEST_BUDGETS_VIEW = 'REQUEST_BUDGETS_VIEW';
export const RECEIVE_BUDGETS_VIEW = 'RECEIVE_BUDGETS_VIEW';
export const REQUEST_REFRESH_GRID_DATA = 'REQUEST_REFRESH_GRID_DATA';
export const RECEIVE_REFRESH_GRID_DATA = 'RECEIVE_REFRESH_GRID_DATA';
export const REQUEST_BUDGETS_SAVE_NEW_VERSION = 'REQUEST_BUDGETS_SAVE_NEW_VERSION';
export const RECEIVE_BUDGETS_SAVE_NEW_VERSION = 'RECEIVE_BUDGETS_SAVE_NEW_VERSION';
export const RESET_BUDGETS_VIEW = 'RESET_BUDGETS_VIEW';

export const requestBudgetVersions = () => ({
    type: REQUEST_BUDGETS_VERSIONS,
});

export const receiveBudgetVersions = versions => ({
    type: RECEIVE_BUDGETS_VERSIONS,
    versions,
});

export const requestBudgetConfigData = () => ({
    type: REQUEST_BUDGETS_CONFIG_DATA,
});

export const receiveBudgetConfigData = config => ({
    type: RECEIVE_BUDGETS_CONFIG_DATA,
    config,
});

export const requestBudgetViewData = () => ({
    type: REQUEST_BUDGETS_VIEW,
});

export const receiveBudgetViewData = (viewData, view) => ({
    type: RECEIVE_BUDGETS_VIEW,
    viewData,
    view,
});

export const requestSendDataForSpreading = () => ({
    type: REQUEST_REFRESH_GRID_DATA,
});

export const receiveSendDataForSpreading = () => ({
    type: RECEIVE_REFRESH_GRID_DATA,
});

export const requestBudgetSaveNewVersion = () => ({
    type: REQUEST_BUDGETS_SAVE_NEW_VERSION,
});

export const receiveBudgetSaveNewVersion = version => ({
    type: RECEIVE_BUDGETS_SAVE_NEW_VERSION,
    version,
});

export const resetState = () => ({
    type: RESET_BUDGETS_VIEW,
});

export function getBudgetVersions(budgetId) {
    return (dispatch) => {
        dispatch(requestBudgetVersions());
        return request
            .get(`${getApiUrl()}planning/budgets/${budgetId}/versions`)
            .then(
            res => dispatch(receiveBudgetVersions(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function fetchBudgetConfigData() {
    return (dispatch) => {
        dispatch(requestBudgetConfigData());
        return request
            .get(`${getApiUrl()}planning/config`)
            .then(
            res => dispatch(receiveBudgetConfigData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function fetchBudgetMetricData(budget, version, view, metric, query) {
    return (dispatch) => {
        const metricList = metric.length > 1 ? metric.join(',') : metric;
        const queryToSend = {
            ...query,
            metrics: query && query.metrics ? query.metrics : metricList,
        };
        dispatch(requestBudgetViewData());
        return request
            .get(`${getApiUrl()}planning/budgets/${budget}/versions/${version}/${view}/metrics`)
            .query(queryToSend)
            .then(
            res => dispatch(receiveBudgetViewData(res.body, view)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

export function sendDataForSpreading(budget, version, view, updatedObj) {
    return (dispatch) => {
        dispatch(requestSendDataForSpreading());
        const req = request.put(`${getApiUrl()}planning/budgets/${budget}/versions/${version}/${view}/metrics`);
        return req.send({
            ...updatedObj,
            value: updatedObj.value === 0 ? 0.0001 : updatedObj.value,
        })
            .then(
            (res) => {
                const isResponseSuccess = res.statusCode >= 200 && res.statusCode <= 399;

                if (isResponseSuccess) {
                    dispatch(receiveSendDataForSpreading());
                } else {
                    dispatch(messages({ content: 'Not OK', response: '', isError: true }));
                }

                return res.body;
            },
            (err) => {
                dispatch(receiveSendDataForSpreading());
                dispatch(messages({ content: err, response: err.response, isError: true }));
                throw err;
            },
            );
    };
}

export function saveNewBudgetVersion(budgetId, versionId) {
    return (dispatch) => {
        dispatch(requestBudgetSaveNewVersion());
        return request
            .post(`${getApiUrl()}planning/budgets/${budgetId}/versions`)
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
