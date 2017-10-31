import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl from '../Helpers';
import { messages } from '../notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VIEW = 'REQUEST_BUDGETS_VIEW';
export const RECEIVE_BUDGETS_VIEW = 'RECEIVE_BUDGETS_VIEW';


function requestBudgetVersions() {
    return {
        type: REQUEST_BUDGETS_VIEW,
    };
}

function receiveBudgetViewsData(viewData) {
    return {
        type: RECEIVE_BUDGETS_VIEW,
        viewData,
    };
}


export function fetchBudgetViewData() {
    return (dispatch) => {
        dispatch(requestBudgetVersions());
        return request
            // .get(`${getApiUrl()}planning/seasons/show/available`)
            .get('http://localhost:3001/planning/budgets/versions/13/exec')
            .then(
                res => dispatch(receiveBudgetViewsData(res.body)),
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
