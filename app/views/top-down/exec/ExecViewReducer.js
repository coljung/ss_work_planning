import { REQUEST_BUDGETS_EXEC_VIEW,
         RECEIVE_BUDGETS_EXEC_VIEW,
         RESET_BUDGETS_EXEC_VIEW } from './ExecViewActions';

const initialState = {
    viewExecData: [],
    viewExecDataFetched: false,
};

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case RESET_BUDGETS_EXEC_VIEW:
            return initialState;
        case REQUEST_BUDGETS_EXEC_VIEW:
            return Object.assign({}, state, {
                viewExecData: false,
            });
        case RECEIVE_BUDGETS_EXEC_VIEW: {
            return Object.assign({}, state, {
                viewExecData: action.viewData,
                viewExecDataFetched: true,
            });
        }
        default:
            return state;
    }
};
