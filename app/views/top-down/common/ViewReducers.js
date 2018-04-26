import { REQUEST_BUDGETS_VIEW,
         RECEIVE_BUDGETS_VIEW,
         RESET_BUDGETS_VIEW,
         REQUEST_BUDGETS_CONFIG_DATA,
         RECEIVE_BUDGETS_CONFIG_DATA } from './ViewActions';

const initialState = {
    viewData: [],
    config: [],
    viewDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_VIEW:
        case REQUEST_BUDGETS_VIEW:
        case REQUEST_BUDGETS_CONFIG_DATA:
            return initialState;
        case RECEIVE_BUDGETS_VIEW: {
            const setData = [];
            setData[action.view] = action.viewData;

            return Object.assign({}, state, {
                viewData: setData,
                viewDataFetched: true,
            });
        }
        case RECEIVE_BUDGETS_CONFIG_DATA: {
            return Object.assign({}, state, {
                config: action.config,
            });
        }
        default:
            return state;
    }
};
