import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_TOTAL_VIEW = 'REQUEST_BUDGETS_TOTAL_VIEW';
export const RECEIVE_BUDGETS_TOTAL_VIEW = 'RECEIVE_BUDGETS_TOTAL_VIEW';
export const RESET_BUDGETS_TOTAL_VIEW = 'RESET_BUDGETS_TOTAL_VIEW';

export function requestBudgetTotalViewData() {
    return {
        type: REQUEST_BUDGETS_TOTAL_VIEW,
    };
}

function receiveBudgetTotalViewData(viewData) {
    return {
        type: RECEIVE_BUDGETS_TOTAL_VIEW,
        viewData,
    };
}

export function resetState() {
    return {
        type: RESET_BUDGETS_TOTAL_VIEW,
    };
}

export function fetchBudgetTotalData(budget, version) {
    return (dispatch) => {
        dispatch(requestBudgetTotalViewData());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get(`http://localhost:3001/planning/budgets/${budget}/versions/${version}/total`)
            .then(
            res => dispatch(receiveBudgetTotalViewData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
