import agent from 'superagent';
import wrap from 'superagent-promise';
import getApiUrl, { defaultMetricString } from 'helpers';
import { messages } from 'notifications/NotificationActions';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_EXEC_VIEW = 'REQUEST_BUDGETS_EXEC_VIEW';
export const RECEIVE_BUDGETS_EXEC_VIEW = 'RECEIVE_BUDGETS_EXEC_VIEW';
export const RESET_BUDGETS_EXEC_VIEW = 'RESET_BUDGETS_EXEC_VIEW';

function requestBudgetExecViewData() {
    return {
        type: REQUEST_BUDGETS_EXEC_VIEW,
    };
}

function receiveBudgetExecViewData(viewData) {
    return {
        type: RECEIVE_BUDGETS_EXEC_VIEW,
        viewData,
    };
}

export function resetState() {
    return {
        type: RESET_BUDGETS_EXEC_VIEW,
    };
}

export function fetchBudgetExecData(budget, version) {
    return (dispatch) => {
        dispatch(requestBudgetExecViewData());
        return request
            .get(`${getApiUrl()}planning/budgets/${budget}/versions/${version}/exec`)
            .query({
              metricSeq: defaultMetricString()
            })
            .then(
            res => dispatch(receiveBudgetExecViewData(res.body)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
