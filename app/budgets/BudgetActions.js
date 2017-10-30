import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS = 'REQUEST_BUDGETS';
export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS';
export const REQUEST_SEASONS = 'REQUEST_SEASONS';
export const RECEIVE_SEASONS = 'RECEIVE_SEASONS';

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

function requestSeasons() {
    return {
        type: REQUEST_SEASONS,
    };
}

function receiveSeasons(seasons) {
    return {
        type: RECEIVE_SEASONS,
        seasons,
    };
}

export function fetchBudgets() {
    return (dispatch) => {
        dispatch(requestBudgets());
        return request
            .get('http://localhost:3001/planning/seasons')
            .then(
                res => dispatch(receiveBudgets(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function fetchSeasons() {
    return (dispatch) => {
        dispatch(requestSeasons());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get('http://localhost:3001/planning/seasons/show/available')
            .then(
                res => dispatch(receiveSeasons(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
