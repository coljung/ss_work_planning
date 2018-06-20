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
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle RECEIVE_BUDGETS_SAVE_NEW_VERSION', () => {
        const state = {
            newVersion: null,
            versions: [],
        };

        expect(
            reducer(state, {
                type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
                version: { hello: 'world' }
            })
        ).toEqual({
            newVersion: { hello: 'world' },
            versions: [{ hello: 'world' }],
        })
    });



    it('should handle RECEIVE_BUDGETS_VERSIONS', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_BUDGETS_VERSIONS,
                versions: [
                    { foo: 'bar' }
                ]
            })
        ).toEqual({
            config: {},
            isBudgetLoading: false,
            isDataSpreading: false,
            isRefreshRequired: false,
            newVersion: null,
            versions: [{ foo: 'bar' }],
            view: null,
            viewData: [],
        })
    });

});
