import { REQUEST_BUDGETS_VIEW,
         RECEIVE_BUDGETS_VIEW,
         RESET_BUDGETS_VIEW,
         REQUEST_BUDGETS_CONFIG_DATA,
         RECEIVE_BUDGETS_CONFIG_DATA,
         RECEIVE_REFRESH_GRID_DATA,
         REQUEST_REFRESH_GRID_DATA } from './SectionActions';

const initialState = {
    viewData: [],
    config: [],
    viewDataFetched: false,
    refreshData: false,
    spreadingData: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_VIEW:
        case REQUEST_BUDGETS_CONFIG_DATA:
            return initialState;
        case REQUEST_BUDGETS_VIEW:
            return Object.assign({}, state, {
                viewData: [],
                viewDataFetched: false,
                refreshData: false,
            });
        case RECEIVE_BUDGETS_VIEW: {
            const setData = [];
            setData[action.view] = action.viewData;
            return Object.assign({}, state, {
                viewData: setData,
                viewDataFetched: true,
                refreshData: false,
            });
        }
        case RECEIVE_BUDGETS_CONFIG_DATA:
            return Object.assign({}, state, {
                config: action.config,
            });
        case REQUEST_REFRESH_GRID_DATA:
            return Object.assign({}, state, {
                refreshData: false,
                spreadingData: true,
            });
        case RECEIVE_REFRESH_GRID_DATA:
            return Object.assign({}, state, {
                refreshData: true,
                spreadingData: false,
            });
        default:
            return state;
    }
};
