// import { expect } from 'chai';
import reducer from '../../../../app/components/customNavigation/CustomNavigationReducer';
import * as actions from '../../../../app/components/customNavigation/CustomNavigationActions';

let initialState;

describe('CustomNavigationReducer', () => {
    beforeEach(() => {
        initialState = {
            budgetId: null,
            seasonName: null,
            view: null,
        };
    });

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle GLOBAL_DATA', () => {

        const options = [11,'SS', 'men'];

        const urlAction = {
            type: actions.GLOBAL_DATA,
            options,
        };
        expect(reducer({}, urlAction)).toEqual({
            budgetId: 11,
            seasonName: 'SS',
            view: 'men'});
    });


    it('should CLEAR_GLOBAL_DATA', () => {
        const clearAction = {
            type: actions.CLEAR_GLOBAL_DATA,
        };
        expect(reducer({}, clearAction)).toEqual(initialState)
    });
});
