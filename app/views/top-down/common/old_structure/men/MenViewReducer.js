import { REQUEST_BUDGETS_MEN_VIEW,
         RECEIVE_BUDGETS_MEN_VIEW,
         RESET_BUDGETS_MEN_VIEW } from './MenViewActions';

const initialState = {
    viewMenData: [],
    viewMenDataFetched: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_BUDGETS_MEN_VIEW:
            return initialState;
        case REQUEST_BUDGETS_MEN_VIEW:
            return Object.assign({}, state, {
                viewMenData: false,
            });
        case RECEIVE_BUDGETS_MEN_VIEW: {
            return Object.assign({}, state, {
                viewMenData: action.viewData,
                viewMenDataFetched: true,
            });
        }
        default:
            return state;
    }
};
