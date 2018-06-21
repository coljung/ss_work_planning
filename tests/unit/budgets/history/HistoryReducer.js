import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../app/budgets/history/HistoryActions';
import reducer, {
    defaultView
} from '../../../../app/budgets/history/HistoryReducer';
import { getView } from '../../../../app/budgets/history/utils';

describe('History Reducer', () => {
    let middlewares;
    let mockStore;
    let store;
    let view;
    let item;
    let item2;

    beforeAll(() => {
        middlewares = [thunk];
        mockStore = configureMockStore(middlewares);
        store = mockStore({ HistoryReducer: {} });
        view = 'men';
        item = {
            foo: 'bar'
        };
        item2 = {
            foo: 'qaz'
        };
    });

    it('should push multiple item into a view', () => {
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
        store = mockStore({ HistoryReducer: {} });
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
        store = mockStore({ HistoryReducer: {} });
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
