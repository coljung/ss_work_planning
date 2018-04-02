import { URLS, CLEAR_URLS, switchUrls, clearUrls } from '../../../../app/components/customNavigation/CustomNavigationActions';

describe('CustomNavigationActions', () => {

    it('should handle URLS', () => {
        expect(switchUrls(43, 23, 'SS', 'V2', 'men' )).toEqual({
            type: URLS,
            budgetid: 43,
            versionid: 23,
            seasonname: 'SS',
            vname: 'V2',
            tab: 'men',
        });
    });

    it('should handle CLEAR_URLS', () => {
        expect(clearUrls()).toEqual({ type: CLEAR_URLS });
    });
});
