import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_SAVE_NEW_VERSION = 'REQUEST_BUDGETS_SAVE_NEW_VERSION';
export const RECEIVE_BUDGETS_SAVE_NEW_VERSION = 'RECEIVE_BUDGETS_SAVE_NEW_VERSION';

function requestBudgetSaveNewVersion() {
    return {
        type: REQUEST_BUDGETS_SAVE_NEW_VERSION,
    };
}

function receiveBudgetSaveNewVersion(version) {
    return {
        type: RECEIVE_BUDGETS_SAVE_NEW_VERSION,
        version,
    };
}

export function saveNewBudgetVersion(seasonID, id) {
    return (dispatch) => {
        dispatch(requestBudgetSaveNewVersion());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .post(`http://localhost:3001/planning/seasons/${seasonID}/versions/${id}/duplicate`)
            .then(
                res => {
                    dispatch(messages({ content: 'New Version Saved successfully!', response: '', isError: false }));
                    dispatch(receiveBudgetSaveNewVersion(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
