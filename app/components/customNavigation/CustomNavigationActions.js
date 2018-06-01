// Action names
export const GLOBAL_DATA = 'GLOBAL_DATA';
export const CLEAR_GLOBAL_DATA = 'CLEAR_GLOBAL_DATA';

// Internal actions
export function switchGlobalData(budgetId, versionId, seasonName, versionName, view) {
    return {
        type: GLOBAL_DATA,
        budgetId,
        versionId,
        seasonName,
        versionName,
        view,
    };
}


export function clearGlobalData() {
    return {
        type: CLEAR_GLOBAL_DATA,
    };
}
