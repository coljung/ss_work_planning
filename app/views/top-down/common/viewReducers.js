import { REQUEST_BUDGETS_VIEW,
         RECEIVE_BUDGETS_VIEW,
         RESET_BUDGETS_VIEW } from './viewActions';

const initialState = {
    viewData: [],
    viewDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_VIEW:
            return initialState;
        case REQUEST_BUDGETS_VIEW:
            return initialState;
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
