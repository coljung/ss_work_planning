import i18n from 'i18next';
import agent from 'superagent';
import wrap from 'superagent-promise';
import actions from './actions';
import getApiUrl from '../../Helpers';
import { messages } from '../../notifications/NotificationActions';

const request = wrap(agent, Promise);

function fetchBudgets() {
    return (dispatch) => {
        dispatch(actions.requestBudgets());
        return request
            .get(`${getApiUrl()}planning/budgets`)
            .query()
            .then(
            res => dispatch(actions.receiveBudgets(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

function fetchAvailableSeasons() {
    return (dispatch) => {
        dispatch(actions.requestSeasons());
        return request
            .get(`${getApiUrl()}planning/budgets/show/available`)
            .then(
            res => dispatch(actions.receiveSeasons(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

function createBudget(budget) {
    return (dispatch) => {
        dispatch(actions.requestBudgetCreate(budget));
        const req = request.post(`${getApiUrl()}planning/budgets`);

        return req
            .send(budget)
            .then(
            (res) => {
                dispatch(messages({ content: i18n.t('home.notification.budgetCreated'), response: '', isError: false }));
                return dispatch(actions.receiveBudgetCreate(res.body));
            },
            (err) => {
                dispatch(messages({ content: err, response: err.response, isError: true }));
            },
        );
    };
}

export default {
    fetchBudgets,
    fetchAvailableSeasons,
    createBudget,
};
