import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VIEW = 'REQUEST_BUDGETS_VIEW';
export const RECEIVE_BUDGETS_VIEW = 'RECEIVE_BUDGETS_VIEW';
export const RESET_BUDGETS_VIEW = 'RESET_BUDGETS_VIEW';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';

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

export function fetchBudgetData(budget, version, view) {
    return (dispatch) => {
        dispatch(requestBudgetViewData());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get(`http://localhost:3001/planning/budgets/${budget}/versions/${version}/${view}`)
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
