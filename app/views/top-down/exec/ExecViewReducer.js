// TODO Remove this, not used anymore
import { REQUEST_BUDGETS_EXEC_VIEW,
         RECEIVE_BUDGETS_EXEC_VIEW,
         RESET_BUDGETS_EXEC_VIEW } from './ExecViewActions';

const initialState = {
    loading: false,
    viewExecData: {
        data: [],
        info: {
            currentMonthColumn: 0,
            has_gaps: false,
            metrics: 0,
            row_span: 0,
            season: '',
            start_row: 0,
            total: 0,
            total_cols: 0,
            hidden_rows: [],
        },
    },
    viewExecDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_EXEC_VIEW:
            return initialState;
        case REQUEST_BUDGETS_EXEC_VIEW:
            return {
                ...state,
                loading: true,
            };
        case RECEIVE_BUDGETS_EXEC_VIEW: {
            return {
                ...state,
                viewExecData: action.viewData,
                viewExecDataFetched: true,
                loading: false,
            };
        }
        default:
            return state;
    }
};
