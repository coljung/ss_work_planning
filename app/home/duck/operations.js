import i18n from 'i18next';
import agent from 'superagent';
import wrap from 'superagent-promise';
import actions from './actions';
import getApiUrl from '../../helpers';
import { messages } from '../../notifications/NotificationActions';
import types from './types';

const request = wrap(agent, Promise);

function fetchBudgets() {
    return (dispatch) => {
        dispatch(actions.requestBudgets());
        return request
            .get(`${getApiUrl()}/planning/budgets`)
            .query()
            .then(
            res => dispatch(actions.receiveBudgets(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

function fetchAvailableSeasons() {
    return {
        types: [types.REQUEST_SEASONS, types.RECEIVE_SEASONS, 'ERROR'],
        promise: client => client.get('/planning/budgets/show/available'),
    };
}

function createBudget(budget) {
    return (dispatch) => {
        dispatch(actions.requestBudgetCreate(budget));
        const req = request.post(`${getApiUrl()}/planning/budgets`);

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
