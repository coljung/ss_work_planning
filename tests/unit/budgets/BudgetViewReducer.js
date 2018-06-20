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
            isBudgetLoading: false,
            isDataSpreading: false,
            isRefreshRequired: false,
            newVersion: null,
            versions: [],
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

    it('should handle RECEIVE_BUDGETS_VERSIONS', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_BUDGETS_VERSIONS,
                versions: {
                    data: [{ foo: 'bar' }]
                }
            })
        ).toEqual({
            ...initialState,
            versions: [{ foo: 'bar' }],
        })
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
        // TODO
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

    it.skip('should handle RECEIVE_BUDGETS_SAVE_NEW_VERSION', () => {
        // todo
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
