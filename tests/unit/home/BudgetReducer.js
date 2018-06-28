import reducer from '../../../app/home/BudgetReducer';
import * as actions from '../../../app/home/BudgetActions';
import * as sinon from 'sinon';

let sandbox;
let initialState;


describe('BudgetReducer', () => {

    beforeAll(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        initialState = {
            budgets: [],
            seasons: [],
            budgetsFetched: false,
            seasonsFetched: false,
            budgetCreateFetched: true,
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle REQUEST_BUDGETS', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_BUDGETS
            })
        ).toEqual(Object.assign({}, initialState, {
            budgetsFetched: false,
        }))
    });

    it('should handle RECEIVE_BUDGETS', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_BUDGETS,
                budgets: [
                    { foo: 'bar' }
                ]
            })
        ).toEqual(Object.assign({}, initialState, {
            budgets: [
                { foo: 'bar' }
            ],
            budgetsFetched: true,
        }))
    });

    it('should handle REQUEST_CREATE_BUDGET', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_CREATE_BUDGET
            })
        ).toEqual(Object.assign({}, initialState, {
            budgetCreateFetched: false,
        }))
    });

    it('should handle RECEIVE_CREATE_BUDGET', () => {
        const state = {
            budgets: [
                { test: 'bb' }
            ],
            seasons: [],
            budgetsFetched: false,
            seasonsFetched: false,
            budgetCreateFetched: true,
        }
        expect(
            reducer(state, {
                type: actions.RECEIVE_CREATE_BUDGET,
                budget: { foo: 'bar' }
            })
        ).toEqual(Object.assign({}, state, {
            budgets: [
                { test: 'bb' },
                { foo: 'bar' }
            ],
            budgetCreateFetched: true,
        }))
    });

    it('should handle REQUEST_SEASONS OR RESET_SEASONS_VIEW', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_SEASONS
            })
        ).toEqual(Object.assign({}, initialState, {
            seasonsFetched: false,
        }))

        expect(
            reducer(undefined, {
                type: actions.RESET_SEASONS_VIEW
            })
        ).toEqual(Object.assign({}, initialState, {
            seasonsFetched: false,
        }))
    });

    it('should handle RECEIVE_SEASONS', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_SEASONS,
                seasons: [{ name: 'season 1' }]
            })
        ).toEqual(Object.assign({}, initialState, {
            seasons: [{ name: 'season 1' }],
            seasonsFetched: true,
        }))
    });
});
