import * as actions from '../../../../app/budgets/history/HistoryActions';
import reducer from '../../../../app/budgets/history/HistoryReducer';

describe('History Reducer', () => {
    let initialState;
    let currentState;

    beforeEach(() => {
        initialState = {};
        currentState = {
            total: {
                past: [ 'testPast1', 'testPast2' ],
                present: 'testPresent',
                future: [ 'testFuture' ],
            },
        };
    });

    it('Should return the current state on other type', () => {
        expect(
            reducer(currentState, {
                type: 'test',
            })
        ).toEqual(currentState);
    });

    it('Should return the initial state on CLEAR_GLOBAL_DATA', () => {
        expect(
            reducer(currentState, {
                type: 'CLEAR_GLOBAL_DATA',
            })
        ).toEqual({
            past: [],
            present: null,
            future: [],
        });
    });

    it('Should return the current state on HISTORY_PUSH when pushing the present state', () => {
        expect(
            reducer(currentState, {
                type: actions.HISTORY_PUSH,
                view: 'total',
                item: 'testPresent',
            })
        ).toEqual(currentState);
    });

    it('Should push the new state on HISTORY_PUSH', () => {
        currentState.total.future = [];

        expect(
            reducer(currentState, {
                type: actions.HISTORY_PUSH,
                view: 'total',
                item: 'testPresent2',
            })
        ).toEqual(Object.assign({}, initialState, {
            total: {
                past: [ 'testPast1', 'testPast2', 'testPresent' ],
                present: 'testPresent2',
                future: [],
            },
        }));
    });

    it('Should push the new state on HISTORY_PUSH when no present', () => {
        currentState.total.present = null;
        currentState.total.future = [];

        expect(
            reducer(currentState, {
                type: actions.HISTORY_PUSH,
                view: 'total',
                item: 'testPresent2',
            })
        ).toEqual(Object.assign({}, initialState, {
            total: {
                past: [ 'testPast1', 'testPast2' ],
                present: 'testPresent2',
                future: [],
            },
        }));
    });

    it('Should return the modified state on HISTORY_UNDO', () => {
        expect(
            reducer(currentState, {
                type: actions.HISTORY_UNDO,
                view: 'total',
            })
        ).toEqual(Object.assign({}, initialState, {
            total: {
                past: [ 'testPast1' ],
                present: 'testPast2',
                future: [ 'testPresent', 'testFuture' ],
            },
        }));
    });

    it('Should return the modified state on HISTORY_REDO', () => {
        expect(
            reducer(currentState, {
                type: actions.HISTORY_REDO,
                view: 'total',
            })
        ).toEqual(Object.assign({}, initialState, {
            total: {
                past: [ 'testPast1', 'testPast2', 'testPresent' ],
                present: 'testFuture',
                future: [],
            },
        }));
    });
});
