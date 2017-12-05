import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS = 'REQUEST_BUDGETS';
export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS';
export const REQUEST_SEASONS = 'REQUEST_SEASONS';
export const RECEIVE_SEASONS = 'RECEIVE_SEASONS';
export const RESET_SEASONS_VIEW = 'RESET_SEASONS_VIEW';
export const REQUEST_CREATE_BUDGET = 'REQUEST_CREATE_BUDGET';
export const RECEIVE_CREATE_BUDGET = 'RECEIVE_CREATE_BUDGET';

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

function requestBudgetCreate(budget) {
    return {
        type: REQUEST_CREATE_BUDGET,
        budget,
    };
}

function receiveBudgetCreate(budget) {
    return {
        type: RECEIVE_CREATE_BUDGET,
        budget,
    };
}

export function resetState() {
    return {
        type: RESET_SEASONS_VIEW,
    };
}

export function fetchBudgets() {
    return (dispatch) => {
        dispatch(requestBudgets());
        return request
            .get('http://localhost:3001/planning/seasons')
            .query({ page_size: 1000 })
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

export function createBudget(budget) {
    return (dispatch) => {
        dispatch(requestBudgetCreate(budget));
        const req = request.post('http://localhost:3001/planning/seasons');
        console.log(budget);
        return req.send(budget)
            .then(
                (res) => {
                    fetchBudgets()(dispatch);
                    dispatch(messages({ content: 'Budget created successfully!', response: '', isError: false }));
                    return dispatch(receiveBudgetCreate(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
