import i18n from 'i18next';
import agent from 'superagent';
import wrap from 'superagent-promise';
import { messages } from 'notifications/NotificationActions';
import getApiUrl from '../Helpers';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_CONFIG_DATA = 'REQUEST_BUDGETS_CONFIG_DATA';
export const RECEIVE_BUDGETS_CONFIG_DATA = 'RECEIVE_BUDGETS_CONFIG_DATA';
export const REQUEST_BUDGETS_DATA = 'REQUEST_BUDGETS_DATA';
export const RECEIVE_BUDGETS_DATA = 'RECEIVE_BUDGETS_DATA';
export const REQUEST_SPREAD_DATA = 'REQUEST_SPREAD_DATA';
export const RECEIVE_SPREAD_DATA = 'RECEIVE_SPREAD_DATA';
export const SET_FILTER_SETUP = 'SET_FILTER_SETUP';
export const RESET_BUDGETS_DATA = 'RESET_BUDGETS_DATA';
export const SET_TRIGGER_CHANGE = 'SET_TRIGGER_CHANGE';
export const REQUEST_VIEW_DOWNLOAD = 'REQUEST_VIEW_DOWNLOAD';

export const requestViewDownload = (budgetId, view, metric) => ({
    type: REQUEST_VIEW_DOWNLOAD,
    budgetId,
    view,
    metric,
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

export function getViewExportFile(budgetId, view, metric) {
    return (dispatch) => {
        const metricList = metric.length > 1 ? metric.join(',') : metric;
        const queryToSend = `metrics=${metricList}`;
        const url = `${getApiUrl()}planning/budgets/${budgetId}/${view}/metrics/export?${queryToSend}`;
        window.open(url);

        return dispatch(requestViewDownload(budgetId, view, metric));
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

export function fetchBudgetMetricData(budget, view, metric, query) {
    return (dispatch) => {
        const metricList = metric.length > 1 ? metric.join(',') : metric;
        const queryToSend = {
            ...query,
            metrics: query && query.metrics ? query.metrics : metricList,
        };
        dispatch(requestBudgetViewData());
        return request
            .get(`${getApiUrl()}planning/budgets/${budget}/${view}/metrics`)
            .query(queryToSend)
            .then(
            res => dispatch(receiveBudgetViewData(res.body, view)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

export function sendDataForSpreading(budget, view, updatedObj) {
    return (dispatch) => {
        dispatch(requestSendDataForSpreading());
        const req = request.put(`${getApiUrl()}planning/budgets/${budget}/${view}/metrics`);
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
                    dispatch(messages({ content: i18n.t('budgetView.notification.spreadingFailed'), response: '', isError: true }));
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
