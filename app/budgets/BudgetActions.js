import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS = 'REQUEST_BUDGETS';
export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS';

function requestBudgets() {
    return {
        type: REQUEST_BUDGETS,
    };
}

function receiveBudgets(budgets) {
    return {
        type: RECEIVE_BUDGETS,
        budgets,
    };
}

export function fetchBudgets() {
    return (dispatch) => {
        dispatch(requestBudgets());
        return request
            .get(`${getApiUrl()}budgets`)
            .then(
                res => dispatch(receiveBudgets(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
