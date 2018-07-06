import agent from 'superagent';
import wrap from 'superagent-promise';
import { messages } from 'notifications/NotificationActions';
import getApiUrl from '../Helpers';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VERSIONS = 'REQUEST_BUDGETS_VERSIONS';
export const RECEIVE_BUDGETS_VERSIONS = 'RECEIVE_BUDGETS_VERSIONS';
export const REQUEST_BUDGETS_CONFIG_DATA = 'REQUEST_BUDGETS_CONFIG_DATA';
export const RECEIVE_BUDGETS_CONFIG_DATA = 'RECEIVE_BUDGETS_CONFIG_DATA';
export const REQUEST_BUDGETS_DATA = 'REQUEST_BUDGETS_DATA';
export const RECEIVE_BUDGETS_DATA = 'RECEIVE_BUDGETS_DATA';
export const REQUEST_SPREAD_DATA = 'REQUEST_SPREAD_DATA';
export const RECEIVE_SPREAD_DATA = 'RECEIVE_SPREAD_DATA';
export const REQUEST_BUDGETS_SAVE_NEW_VERSION = 'REQUEST_BUDGETS_SAVE_NEW_VERSION';
export const RECEIVE_BUDGETS_SAVE_NEW_VERSION = 'RECEIVE_BUDGETS_SAVE_NEW_VERSION';
export const SET_FILTER_SETUP = 'SET_FILTER_SETUP';
export const RESET_BUDGETS_DATA = 'RESET_BUDGETS_DATA';
export const SET_TRIGGER_CHANGE = 'SET_TRIGGER_CHANGE';
export const REQUEST_VIEW_DOWNLOAD = 'REQUEST_VIEW_DOWNLOAD';

export const requestViewDownload = (budgetId, versionId, view, metric) => ({
    type: REQUEST_VIEW_DOWNLOAD,
    budgetId,
    versionId,
    view,
    metric,
});

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
    type: REQUEST_BUDGETS_DATA,
});

export const receiveBudgetViewData = (viewData, view) => ({
    type: RECEIVE_BUDGETS_DATA,
    viewData,
    view,
});

export const requestSendDataForSpreading = () => ({
    type: REQUEST_SPREAD_DATA,
});

export const receiveSendDataForSpreading = () => ({
    type: RECEIVE_SPREAD_DATA,
});

export const requestBudgetSaveNewVersion = () => ({
    type: REQUEST_BUDGETS_SAVE_NEW_VERSION,
});

export const receiveBudgetSaveNewVersion = version => ({
    type: RECEIVE_BUDGETS_SAVE_NEW_VERSION,
    version,
});

export const filterSetup = filters => ({
    type: SET_FILTER_SETUP,
    filters,
});

export const triggerChange = () => ({
    type: SET_TRIGGER_CHANGE,
});

export const resetState = () => ({
    type: RESET_BUDGETS_DATA,
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

export function getViewExportFile(budgetId, versionId, view, metric) {
    return (dispatch) => {
        const metricList = metric.length > 1 ? metric.join(',') : metric;
        const queryToSend = `metrics=${metricList}`;

        const url = `${getApiUrl()}planning/budgets/${budgetId}/versions/${versionId}/${view}/metrics/export?${queryToSend}`;

        window.open(url);

        return dispatch(requestViewDownload(budgetId, versionId, view, metric));
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
