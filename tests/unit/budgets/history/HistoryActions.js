import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../app/budgets/history/HistoryActions';

describe('History Actions', () => {
    let middlewares;
    let mockStore;
    let store;

    beforeAll(() => {
        middlewares = [thunk];
        mockStore = configureMockStore(middlewares);
    });

    it('Should test history push', () => {
        const view = 'men';
        const item = {
            foo: 'bar'
        };

        const expectedAction = {
            type: actions.HISTORY_PUSH,
            view,
            item
        };

        expect(actions.historyPush(view, item)).toEqual(expectedAction);
    });

    it('Should test history undo', () => {
        store = mockStore({ HistoryReducer: {} });
        const view = 'men';
        const expectedAction = {
            type: actions.HISTORY_UNDO,
            view
        };

        store.dispatch(actions.historyUndo(view));

        const expectedActions = [{ type: 'HISTORY_UNDO', view: 'men' }];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should test goForward', () => {
        store = mockStore({ HistoryReducer: {} });
        const view = 'men';
        const expectedAction = {
            type: actions.HISTORY_REDO,
            view
        };

        store.dispatch(actions.historyRedo(view));

        const expectedActions = [{ type: 'HISTORY_REDO', view: 'men' }];

        expect(store.getActions()).toEqual(expectedActions);
    });
});
