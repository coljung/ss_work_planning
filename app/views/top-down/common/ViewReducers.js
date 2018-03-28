import { REQUEST_BUDGETS_VIEW,
         RECEIVE_BUDGETS_VIEW,
         RESET_BUDGETS_VIEW } from './ViewActions';

const initialState = {
    viewData: [],
    viewDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_VIEW:
        case REQUEST_BUDGETS_VIEW:
            return initialState;
        case RECEIVE_BUDGETS_VIEW: {
            const setData = [];
            setData[action.view] = action.viewData;
            console.log(setData);
            return Object.assign({}, state, {
                viewData: setData,
                viewDataFetched: true,
            });
        }
        default:
            return state;
    }
};
