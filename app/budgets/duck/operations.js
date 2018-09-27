import actions from './actions';
import getApiUrl from '../../helpers';

function getViewExportFile(budgetId, view, filter) {
    return (dispatch) => {
        const queryToSend = JSON.stringify(filter);
        const url = `${getApiUrl()}/planning/budgets/${budgetId}/${view}/export?query=${queryToSend}`;
        window.open(url);

        return dispatch(actions.requestViewDownload(budgetId, view, filter));
    };
}

export default {
    getViewExportFile,
};
