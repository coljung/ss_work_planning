import { GLOBAL_DATA, CLEAR_GLOBAL_DATA } from './CustomNavigationActions';

const initialState = {
    budgetId: null,
    seasonName: null,
    view: null,
};

export default (state = initialState, action) => {
    const [budgetId, seasonName, view] = action.options || '';
    switch (action.type) {
        case GLOBAL_DATA:
            return Object.assign({}, state, {
                budgetId,
                seasonName,
                view,
            });
        case CLEAR_GLOBAL_DATA:
            return initialState;
        default:
            return state;
    }
};
