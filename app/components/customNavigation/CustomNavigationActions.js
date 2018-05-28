// Action names
export const GLOBAL_DATA = 'GLOBAL_DATA';
export const CLEAR_GLOBAL_DATA = 'CLEAR_GLOBAL_DATA';

// Internal actions
export function switchGlobalData(budgetid, versionid, seasonname, vname, tab) {
    return {
        type: GLOBAL_DATA,
        budgetid,
        versionid,
        seasonname,
        vname,
        tab,
    };
}


export function clearGlobalData() {
    return {
        type: CLEAR_GLOBAL_DATA,
    };
}
