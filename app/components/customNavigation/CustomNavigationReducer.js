import { GLOBAL_DATA, CLEAR_GLOBAL_DATA } from './CustomNavigationActions';

const initialState = {
    budgetId: null,
    versionId: null,
    seasonName: null,
    versionName: null,
    view: null,
};

export default (state = initialState, action) => {
    const [budgetId, versionId, seasonName, versionName, view] = action.options || '';
    switch (action.type) {
        case GLOBAL_DATA:
            return Object.assign({}, state, {
                budgetId,
                versionId,
                seasonName,
                versionName,
                view,
            });
        case CLEAR_GLOBAL_DATA:
            return initialState;
        default:
            return state;
    }
};
