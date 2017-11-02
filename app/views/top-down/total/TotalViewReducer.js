import { REQUEST_BUDGETS_TOTAL_VIEW,
         RECEIVE_BUDGETS_TOTAL_VIEW,
         RESET_BUDGETS_TOTAL_VIEW } from './TotalViewActions';

const initialState = {
    viewTotalData: [],
    viewTotalDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_TOTAL_VIEW:
            return initialState;
        case REQUEST_BUDGETS_TOTAL_VIEW:
            return Object.assign({}, state, {
                viewTotalData: false,
            });
        case RECEIVE_BUDGETS_TOTAL_VIEW: {
            return Object.assign({}, state, {
                viewTotalData: action.viewData,
                viewTotalDataFetched: true,
            });
        }
        default:
            return state;
    }
};
