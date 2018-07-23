import reducer from '../../../app/budgets/BudgetViewReducer';
import * as actions from '../../../app/budgets/BudgetViewActions';
import * as sinon from 'sinon';

let sandbox;
let initialState;

describe('BudgetViewReducer', () => {

    beforeAll(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        initialState = {
            config: {},
            filters: [],
            isBudgetLoading: false,
            isDataSpreading: false,
            isRefreshRequired: false,
            view: null,
            viewData: [],
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);

        expect(
            reducer(undefined, {
                type: actions.RESET_BUDGETS_VIEW,
            })
        ).toEqual(initialState);
    });

    it('should handle RECEIVE_BUDGETS_CONFIG_DATA', () => {
        const state = {
            config: null,
        };

        expect(
            reducer(state, {
                type: actions.RECEIVE_BUDGETS_CONFIG_DATA,
                config: { available_metrics: 'SALES' }
            })
        ).toEqual({
            config: { available_metrics: 'SALES' },
        })
    });

    it('should handle REQUEST_BUDGETS_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_BUDGETS_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: true,
        }))
    });

    it.skip('should handle RECEIVE_BUDGETS_DATA', () => {
        const state = {
            view: 'men',
            viewData: 'test',
        };
        // todo
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_BUDGETS_DATA,
                view: 'men',
                viewData: 'test',
            })
        ).toEqual({
            config: {},
            isBudgetLoading: false,
            isDataSpreading: false,
            isRefreshRequired: false,
            view: 'men',
            viewData: { 'men': 'test'},
        })
    });

    it('should handle REQUEST_SPREAD_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_SPREAD_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isDataSpreading: true,
        }))
    });

    it('should handle RECEIVE_SPREAD_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_SPREAD_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: true,
            isDataSpreading: false,
            isRefreshRequired: true,
        }))
    });

    it('should handle SET_FILTER_SETUP', () => {
        expect(
            reducer(undefined, {
                type: actions.SET_FILTER_SETUP,
                filters: ['Cogs'],
            })
        ).toEqual(Object.assign({}, initialState, {
            filters: ['Cogs'],
        }))
    });


    it('should handle SET_TRIGGER_CHANGE', () => {
        expect(
            reducer(undefined, {
                type: actions.SET_TRIGGER_CHANGE,
            })
        ).toEqual(Object.assign({}, initialState, {
            isRefreshRequired: true,
        }))
    });

});
