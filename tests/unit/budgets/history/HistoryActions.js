import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../app/budgets/history/HistoryActions';

describe('History Actions', () => {
    let middlewares;
    let mockStore;
    let view;
    let item;

    beforeAll(() => {
        middlewares = [thunk];
        mockStore = configureMockStore(middlewares);
        view = 'men';
        item = {
            foo: 'bar'
        };
    });

    it('Should test history push', () => {
        const expectedAction = {
            type: actions.HISTORY_PUSH,
            view,
            item
        };

        expect(actions.historyPush(view, item)).toEqual(expectedAction);
    });

    it('Should test history undo', () => {
        const store = mockStore({ HistoryReducer: {} });

        store.dispatch(actions.historyUndo(view));

        const expectedActions = [{ type: 'HISTORY_UNDO', view: 'men' }];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should test goForward', () => {
        const store = mockStore({ HistoryReducer: {} });

        store.dispatch(actions.historyRedo(view));

        const expectedActions = [{ type: 'HISTORY_REDO', view: 'men' }];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should push multiple item into a view', () => {
        const store = mockStore({ HistoryReducer: {} });

        const action = store.dispatch(actions.historyPush(view, item));
        const expectedFirstPushAction = {
            item: { foo: 'bar' },
            type: 'HISTORY_PUSH',
            view: 'men'
        };

        expect(action).toEqual(expectedFirstPushAction);

        store.dispatch(actions.historyPush(view, item));

        const expectedActions = [
            { item: { foo: 'bar' }, type: 'HISTORY_PUSH', view: 'men' },
            { item: { foo: 'bar' }, type: 'HISTORY_PUSH', view: 'men' }
        ];

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should undo', () => {
        const store = mockStore({ HistoryReducer: {} });

        const item2 = { foo: 'qaz' };

        store.dispatch(actions.historyPush(view, item));
        store.dispatch(actions.historyPush(view, item));
        store.dispatch(actions.historyPush(view, item2));
        store.dispatch(actions.historyUndo(view));

        const reducerActions = store.getActions();

        expect(reducerActions[reducerActions.length - 1]).toHaveProperty(
            'type',
            actions.HISTORY_UNDO
        );
        expect(reducerActions[reducerActions.length - 1]).toHaveProperty(
            'view',
            view
        );
    });

    it('Should redo', () => {
        const store = mockStore({ HistoryReducer: {} });

        const item2 = { foo: 'qaz' };

        store.dispatch(actions.historyPush(view, item));
        store.dispatch(actions.historyPush(view, item));
        store.dispatch(actions.historyPush(view, item2));
        store.dispatch(actions.historyUndo(view));
        store.dispatch(actions.historyRedo(view));

        const reducerActions = store.getActions();

        expect(reducerActions[reducerActions.length - 1]).toHaveProperty(
            'type',
            actions.HISTORY_REDO
        );
        expect(reducerActions[reducerActions.length - 1]).toHaveProperty(
            'view',
            view
        );
    });
});
