import { GLOBAL_DATA, CLEAR_GLOBAL_DATA } from './CustomNavigationActions';

const initialState = {
    budgetView: false,
    budgetId: null,
    versionId: null,
    seasonName: null,
    versionName: null,
    view: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_DATA:
            return Object.assign({}, state, {
                budgetView: true,
                budgetId: action.budgetid,
                versionId: action.versionid,
                seasonName: action.seasonname,
                versionName: action.vname,
                view: action.tab,
            });
        case CLEAR_GLOBAL_DATA:
            return initialState;
        default:
            return state;
    }
};
