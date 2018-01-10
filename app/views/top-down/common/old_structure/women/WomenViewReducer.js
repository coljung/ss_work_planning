import { REQUEST_BUDGETS_WOMEN_VIEW,
         RECEIVE_BUDGETS_WOMEN_VIEW,
         RESET_BUDGETS_WOMEN_VIEW } from './WomenViewActions';

const initialState = {
    viewWomenData: [],
    viewWomenDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_WOMEN_VIEW:
            return initialState;
        case REQUEST_BUDGETS_WOMEN_VIEW:
            return Object.assign({}, state, {
                viewWomenData: false,
            });
        case RECEIVE_BUDGETS_WOMEN_VIEW: {
            return Object.assign({}, state, {
                viewWomenData: action.viewData,
                viewWomenDataFetched: true,
            });
        }
        default:
            return state;
    }
};
