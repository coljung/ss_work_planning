// import { expect } from 'chai';
import reducer from '../../../../app/components/customNavigation/CustomNavigationReducer';
import * as actions from '../../../../app/components/customNavigation/CustomNavigationActions';

let initialState;

describe('CustomNavigationReducer', () => {
    beforeEach(() => {
        initialState = {
            budgetView: false,
            budgetId: null,
            versionId: null,
            seasonName: null,
            versionName: null,
            view: null,
        };
    });

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle URLS', () => {

        const urlAction = {
            type: actions.URLS,
            budgetView: true,
            budgetid: 11,
            versionid: 22,
            seasonname: 'SS',
            vname: 'V1',
            tab: 'men' // important to pass correct payload, that's what the tests are for ;)
        };
        expect(reducer({}, urlAction)).toEqual({
            budgetView: true,
            budgetId: 11,
            versionId: 22,
            seasonName: 'SS',
            versionName: 'V1',
            view: 'men'});
    });


    it('should CLEAR_URLS', () => {
        const clearAction = {
            type: actions.CLEAR_URLS,
        };
        expect(reducer({}, clearAction)).toEqual(initialState)
    });
});
