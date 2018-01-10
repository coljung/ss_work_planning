import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_WOMEN_VIEW = 'REQUEST_BUDGETS_WOMEN_VIEW';
export const RECEIVE_BUDGETS_WOMEN_VIEW = 'RECEIVE_BUDGETS_WOMEN_VIEW';
export const RESET_BUDGETS_WOMEN_VIEW = 'RESET_BUDGETS_WOMEN_VIEW';

export function requestBudgetWomenViewData() {
    return {
        type: REQUEST_BUDGETS_WOMEN_VIEW,
    };
}

function receiveBudgetWomenViewData(viewData) {
    return {
        type: RECEIVE_BUDGETS_WOMEN_VIEW,
        viewData,
    };
}

export function resetState() {
    return {
        type: RESET_BUDGETS_WOMEN_VIEW,
    };
}

export function fetchBudgetWomenData(budget, version) {
    return (dispatch) => {
        dispatch(requestBudgetWomenViewData());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get(`http://localhost:3001/planning/budgets/${budget}/versions/${version}/women`)
            .then(
            res => dispatch(receiveBudgetWomenViewData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
