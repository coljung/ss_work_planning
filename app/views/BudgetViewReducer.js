import { REQUEST_BUDGETS_VIEW,
    RECEIVE_BUDGETS_VIEW } from './BudgetViewActions';

const initialState = {
    viewData: [],
    viewDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BUDGETS_VIEW:
            return Object.assign({}, state, {
                viewData: false,
            });
        case RECEIVE_BUDGETS_VIEW: {
            return Object.assign({}, state, {
                viewData: action.viewData,
                viewDataFetched: true,
            });
        }
        default:
            return state;
    }
};
