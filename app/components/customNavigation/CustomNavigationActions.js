export const GLOBAL_DATA = 'GLOBAL_DATA';
export const CLEAR_GLOBAL_DATA = 'CLEAR_GLOBAL_DATA';

export function setGlobalData(...options) {
    return {
        type: GLOBAL_DATA,
        options,
    };
}

export function clearGlobalData() {
    return {
        type: CLEAR_GLOBAL_DATA,
    };
}
