import { GLOBAL_DATA, CLEAR_GLOBAL_DATA, switchGlobalData, clearGlobalData } from '../../../../app/components/customNavigation/CustomNavigationActions';

describe('CustomNavigationActions', () => {

    it('should handle GLOBAL_DATA', () => {
        expect(switchGlobalData(43, 23, 'SS', 'V2', 'men' )).toEqual({
            type: GLOBAL_DATA,
            budgetId: 43,
            versionId: 23,
            seasonName: 'SS',
            versionName: 'V2',
            view: 'men',
        });
    });

    it('should handle CLEAR_GLOBAL_DATA', () => {
        expect(clearGlobalData()).toEqual({ type: CLEAR_GLOBAL_DATA });
    });
});
