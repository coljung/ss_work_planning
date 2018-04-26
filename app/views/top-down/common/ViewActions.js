import agent from 'superagent';
import wrap from 'superagent-promise';
import { messages } from 'notifications/NotificationActions';
import getApiUrl, { defaultMetricSequence } from '../../../Helpers.js';
import budgetData from './grid/budgetData.json';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VIEW = 'REQUEST_BUDGETS_VIEW';
export const RECEIVE_BUDGETS_VIEW = 'RECEIVE_BUDGETS_VIEW';
export const RESET_BUDGETS_VIEW = 'RESET_BUDGETS_VIEW';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';
export const REQUEST_BUDGETS_CONFIG_DATA = 'REQUEST_BUDGETS_CONFIG_DATA';
export const RECEIVE_BUDGETS_CONFIG_DATA = 'RECEIVE_BUDGETS_CONFIG_DATA';

export const requestBudgetViewData = () => ({
    type: REQUEST_BUDGETS_VIEW,
});

export const receiveBudgetViewData = (viewData, view) => ({
    type: RECEIVE_BUDGETS_VIEW,
    viewData,
    view,
});

export const requestBudgetSave = () => ({
    type: REQUEST_BUDGETS_SAVE_BUDGET,
});

export const receiveBudgetSave = version => ({
    type: RECEIVE_BUDGETS_SAVE_BUDGET,
    version,
});

export const resetState = () => ({
    type: RESET_BUDGETS_VIEW,
});

export const requestBudgetConfigData = () => ({
    type: REQUEST_BUDGETS_CONFIG_DATA,
});

export const receiveBudgetConfigData = config => ({
    type: RECEIVE_BUDGETS_CONFIG_DATA,
    config,
});

export function fetchBudgetData(budget, version, view, query) {
    return (dispatch) => {
        // merge query with the default if is not defined
        const queryToSend = {
            ...query,
            metricSeq: query && query.metricSeq ? query.metricSeq : defaultMetricSequence(),
        };

        dispatch(requestBudgetViewData());
        return request
            .get(`${getApiUrl()}planning/budgets/${budget}/versions/${version}/${view}`)
            .query(queryToSend)
            .then(
            res => dispatch(receiveBudgetViewData(budgetData, view)),
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

export function saveBudget(budget, id, view, data) {
    return (dispatch) => {
        dispatch(requestBudgetSave());
        return request
            .post(`${getApiUrl()}planning/budgets/${budget}/versions/${id}/${view}`)
            .send(data)
            .then(
            (res) => {
                dispatch(messages({ content: 'Budget Saved successfully!', response: '', isError: false }));
                dispatch(receiveBudgetSave(res.body));
            },
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
