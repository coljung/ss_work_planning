import { GLOBAL_DATA, CLEAR_GLOBAL_DATA, setGlobalData, clearGlobalData } from '../../../../app/components/customNavigation/CustomNavigationActions';

describe('CustomNavigationActions', () => {

    it('should handle GLOBAL_DATA', () => {
        const options = [43, 23, 'SS', 'V2', 'men'];
        expect(setGlobalData(43, 23, 'SS', 'V2', 'men')).toEqual({
            type: GLOBAL_DATA,
            options: [43, 23, 'SS', 'V2', 'men'],
        });
    });

    it('should handle CLEAR_GLOBAL_DATA', () => {
        expect(clearGlobalData()).toEqual({ type: CLEAR_GLOBAL_DATA });
    });
});
