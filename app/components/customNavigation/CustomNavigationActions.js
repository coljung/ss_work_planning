// Action names
export const URLS = 'URLS';
export const CLEAR_URLS = 'CLEAR_URLS';

// Internal actions
export function switchUrls(budgetid, versionid, seasonname, vname, tab) {
    return {
        type: URLS,
        budgetid,
        versionid,
        seasonname,
        vname,
        tab,
    };
}


export function clearUrls() {
    return {
        type: CLEAR_URLS,
    };
}
