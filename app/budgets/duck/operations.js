import agent from 'superagent';
import wrap from 'superagent-promise';
import actions from './actions';
import getApiUrl from '../../Helpers';
import { messages } from '../../notifications/NotificationActions';

const request = wrap(agent, Promise);

function getViewExportFile(budgetId, view, metrics, plans) {
    return (dispatch) => {
        const filters = {
            metrics,
            plans,
        };
        const queryToSend = JSON.stringify(filters);
        const url = `${getApiUrl()}planning/budgets/${budgetId}/${view}/metrics/export?query=${queryToSend}`;
        window.open(url);

        return dispatch(actions.requestViewDownload(budgetId, view, metrics, plans));
    };
}

function fetchBudgetConfigData() {
    return (dispatch) => {
        dispatch(actions.requestBudgetConfigData());
        return request
            .get(`${getApiUrl()}planning/config`)
            .then(
            res => dispatch(actions.receiveBudgetConfigData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

function fetchBudgetMetricData(budget, view, metrics, plans) {
    return (dispatch) => {
        const filters = {
            metrics,
            plans,
        };

        dispatch(actions.requestBudgetViewData());
        return request
            .post(`${getApiUrl()}planning/budgets/${budget}/${view}/metrics`)
            .send(filters)
            .then(
            res => dispatch(actions.receiveBudgetViewData(res.body, view)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

function sendDataForSpreading(budget, view, updatedObj) {
    return (dispatch) => {
        dispatch(actions.requestSendDataForSpreading());
        const req = request.put(`${getApiUrl()}planning/budgets/${budget}/${view}/metrics`);
        return req.send({
            ...updatedObj,
            value: updatedObj.value === 0 ? 0.0001 : updatedObj.value,
        })
            .then(
            () => dispatch(actions.receiveSendDataForSpreading()),
            (err) => {
                dispatch(actions.receiveSendDataForSpreading());
                dispatch(messages({ content: err, response: err.response, isError: true }));
            },
        );
    };
}

function filterSetup(filters) {
    return (dispatch) => {
        dispatch(actions.filterSetup(filters));
    };
}

function resetState() {
    return (dispatch) => {
        dispatch(actions.resetState());
    };
}

export default {
    getViewExportFile,
    fetchBudgetConfigData,
    fetchBudgetMetricData,
    sendDataForSpreading,
    filterSetup,
    resetState,
};
