import * as sinon from 'sinon';
import reducer from '../../../../app/budgets/duck';
import types from '../../../../app/budgets/duck/types';

let sandbox;
let initialState;

describe('Budget View Reducer', () => {
    beforeAll(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        initialState = {
            config : {},
            filters : {
                availableMetrics : [],
                availablePlans : [],
                selectedMetrics : [],
                selectedPlanTypes : [],
            },
            isBudgetLoading : false,
            isDataSpreading : false,
            isRefreshRequired : false,
            view : null,
            viewData : {},
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the initial state on RESET_BUDGETS_DATA', () => {
        expect(reducer(undefined, {})).toEqual(initialState);

        expect(
            reducer(undefined, {
                type: types.RESET_BUDGETS_DATA,
            })
        ).toEqual(initialState);
    });

    it('should handle RECEIVE_BUDGETS_CONFIG_DATA', () => {
        const state = {
            config: null,
        };

        expect(
            reducer(state, {
                type: types.RECEIVE_BUDGETS_CONFIG_DATA,
                result: { availableMetrics: 'SALES' }
            })
        ).toEqual({
            config: { availableMetrics: 'SALES' },
        });
    });

    it('should handle REQUEST_BUDGETS_DATA', () => {
        expect(
            reducer(undefined, {
                type: types.REQUEST_BUDGETS_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: true,
        }));
    });

    it('should handle RECEIVE_BUDGETS_DATA', () => {
        expect(
            reducer(undefined, {
                type: types.RECEIVE_BUDGETS_DATA,
                view: 'men',
                result: 'test',
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: false,
            view: 'men',
            viewData: 'test',
        }));
    });

    it('should handle REQUEST_SPREAD_DATA', () => {
        expect(
            reducer(undefined, {
                type: types.REQUEST_SPREAD_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isDataSpreading: true,
        }));
    });

    it('should handle RECEIVE_SPREAD_DATA', () => {
        expect(
            reducer(undefined, {
                type: types.RECEIVE_SPREAD_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isDataSpreading: false,
            isRefreshRequired: true,
        }));
    });

    it('should handle SET_FILTER_SETUP', () => {
        expect(
            reducer(undefined, {
                type: types.SET_FILTER_SETUP,
                filters: ['Cogs'],
            })
        ).toEqual(Object.assign({}, initialState, {
            filters: ['Cogs'],
        }));
    });
});
