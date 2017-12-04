import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_MEN_VIEW = 'REQUEST_BUDGETS_MEN_VIEW';
export const RECEIVE_BUDGETS_MEN_VIEW = 'RECEIVE_BUDGETS_MEN_VIEW';
export const RESET_BUDGETS_MEN_VIEW = 'RESET_BUDGETS_MEN_VIEW';

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

export function resetState() {
    return {
        type: RESET_BUDGETS_MEN_VIEW,
    };
}

export function fetchBudgetMenData() {
    return (dispatch) => {
        dispatch(requestBudgetMenViewData());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get('http://localhost:3001/planning/budgets/versions/13/men')
            .then(
            res => dispatch(receiveBudgetMenViewData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
