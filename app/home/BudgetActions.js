import i18n from 'i18next';
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

export function requestBudgets() {
    return {
        type: REQUEST_BUDGETS,
    };
}

export function receiveBudgets(budgets) {
    return {
        type: RECEIVE_BUDGETS,
        budgets,
    };
}

export function requestSeasons() {
    return {
        type: REQUEST_SEASONS,
    };
}

export function receiveSeasons(seasons) {
    return {
        type: RECEIVE_SEASONS,
        seasons,
    };
}

export function requestBudgetCreate(budget) {
    return {
        type: REQUEST_CREATE_BUDGET,
        budget,
    };
}

export function receiveBudgetCreate(budget) {
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
            .get(`${getApiUrl()}planning/budgets`)
            .query()
            .then(
            res => dispatch(receiveBudgets(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function fetchAvailableSeasons() {
    return (dispatch) => {
        dispatch(requestSeasons());
        return request
            .get(`${getApiUrl()}planning/budgets/show/available`)
            .then(
            res => dispatch(receiveSeasons(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function createBudget(budget) {
    return (dispatch) => {
        dispatch(requestBudgetCreate(budget));
        const req = request.post(`${getApiUrl()}planning/budgets`);
        return req.send(budget)
            .then(
            (res) => {
                fetchBudgets()(dispatch);
                dispatch(messages({ content: i18n.t('home.notification.budgetCreated'), response: '', isError: false }));
                return dispatch(receiveBudgetCreate(res.body));
            },
            (err) => {
                dispatch(messages({ content: err, response: err.response, isError: true }));
            },
        );
    };
}
