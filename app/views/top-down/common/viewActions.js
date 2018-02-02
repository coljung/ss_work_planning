import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl, { defaultMetricString } from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VIEW = 'REQUEST_BUDGETS_VIEW';
export const RECEIVE_BUDGETS_VIEW = 'RECEIVE_BUDGETS_VIEW';
export const RESET_BUDGETS_VIEW = 'RESET_BUDGETS_VIEW';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';

export const requestBudgetViewData = () => ({
    type: REQUEST_BUDGETS_VIEW,
});

export const receiveBudgetViewData = (viewData, view) => ({
    type: RECEIVE_BUDGETS_VIEW,
    viewData,
    view,
});

export const requestBudgetSave = () => ({
    type: REQUEST_BUDGETS_SAVE_BUDGET,
});

export const receiveBudgetSave = version => ({
    type: RECEIVE_BUDGETS_SAVE_BUDGET,
    version,
});

export const resetState = () => ({
    type: RESET_BUDGETS_VIEW,
});

export function fetchBudgetData(budget, version, view, query) {
    return (dispatch) => {
        // merge query with the default if is not defined
        query = {
          ...query,
          metricSeq: query && query.metricSeq ? query.metricSeq : defaultMetricString()
        };

        dispatch(requestBudgetViewData());
        return request
            .get(`${getApiUrl()}planning/budgets/${budget}/versions/${version}/${view}`)
            .query(query)
            .then(
            res => dispatch(receiveBudgetViewData(res.body, view)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}

export function saveBudget(budget, id, view, data) {
    return (dispatch) => {
        dispatch(requestBudgetSave());
        return request
            .post(`${getApiUrl()}planning/budgets/${budget}/versions/${id}/${view}`)
            .send(data)
            .then(
                res => {
                    dispatch(messages({ content: 'Budget Saved successfully!', response: '', isError: false }));
                    dispatch(receiveBudgetSave(res.body));
                },
                err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
