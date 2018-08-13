import * as sinon from 'sinon';
import reducer from '../../../../app/home/duck';
import types from '../../../../app/home/duck/types';

let sandbox;
let initialState;

describe('Home Reducer', () => {
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
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle REQUEST_BUDGETS', () => {
        expect(
            reducer(undefined, {
                type: types.REQUEST_BUDGETS
            })
        ).toEqual(Object.assign({}, initialState, {
            budgetsFetched: false,
        }));
    });

    it('should handle RECEIVE_BUDGETS', () => {
        expect(
            reducer(undefined, {
                type: types.RECEIVE_BUDGETS,
                budgets: [
                    { foo: 'bar' }
                ]
            })
        ).toEqual(Object.assign({}, initialState, {
            budgets: [
                { foo: 'bar' }
            ],
            budgetsFetched: true,
        }));
    });

    it('should handle REQUEST_CREATE_BUDGET', () => {
        expect(
            reducer(undefined, {
                type: types.REQUEST_CREATE_BUDGET
            })
        ).toEqual(Object.assign({}, initialState, {
            budgetCreateFetched: false,
        }));
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
        };

        expect(
            reducer(state, {
                type: types.RECEIVE_CREATE_BUDGET,
                budget: { foo: 'bar' }
            })
        ).toEqual(Object.assign({}, state, {
            budgets: [
                { test: 'bb' },
                { foo: 'bar' }
            ],
            budgetCreateFetched: true,
        }));
    });

    it('should handle REQUEST_SEASONS', () => {
        expect(
            reducer(undefined, {
                type: types.REQUEST_SEASONS
            })
        ).toEqual(Object.assign({}, initialState, {
            seasonsFetched: false,
        }));
    });

    it('should handle RECEIVE_SEASONS', () => {
        expect(
            reducer(undefined, {
                type: types.RECEIVE_SEASONS,
                seasons: [{ name: 'season 1' }]
            })
        ).toEqual(Object.assign({}, initialState, {
            seasons: [{ name: 'season 1' }],
            seasonsFetched: true,
        }));
    });
});
