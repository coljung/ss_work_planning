import { GLOBAL_DATA, CLEAR_GLOBAL_DATA, switchGlobalData, clearGlobalData } from '../../../../app/components/customNavigation/CustomNavigationActions';

describe('CustomNavigationActions', () => {

    it('should handle GLOBAL_DATA', () => {
        expect(switchGlobalData(43, 23, 'SS', 'V2', 'men' )).toEqual({
            type: GLOBAL_DATA,
            budgetid: 43,
            versionid: 23,
            seasonname: 'SS',
            vname: 'V2',
            tab: 'men',
        });
    });

    it('should handle CLEAR_GLOBAL_DATA', () => {
        expect(clearGlobalData()).toEqual({ type: CLEAR_GLOBAL_DATA });
    });
});
