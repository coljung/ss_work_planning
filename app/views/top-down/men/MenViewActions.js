import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_MEN_VIEW = 'REQUEST_BUDGETS_MEN_VIEW';
export const RECEIVE_BUDGETS_MEN_VIEW = 'RECEIVE_BUDGETS_MEN_VIEW';
export const RESET_BUDGETS_MEN_VIEW = 'RESET_BUDGETS_MEN_VIEW';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';

export function requestBudgetMenViewData() {
    return {
        type: REQUEST_BUDGETS_MEN_VIEW,
    };
}

function receiveBudgetMenViewData(viewData) {
    return {
        type: RECEIVE_BUDGETS_MEN_VIEW,
        viewData,
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

export const resetState = () => ({
    type: RESET_BUDGETS_MEN_VIEW,
});

export function fetchBudgetMenData(budget, version) {
    return (dispatch) => {
        dispatch(requestBudgetMenViewData());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get(`/api/planning/budgets/${budget}/versions/${version}/men`)
            .then(
            res => dispatch(receiveBudgetMenViewData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveBudget(budget, id, view, data) {
    return (dispatch) => {
        dispatch(requestBudgetSave());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .post(`http://localhost:3001/planning/budgets/${budget}/versions/${id}/${view}`)
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
