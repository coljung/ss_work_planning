import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../app/budgets/history/HistoryActions';
import reducer, { defaultView } from '../../../app/budgets/history/HistoryReducer';
import { canGo as canGoUtil, getView } from '../../../app/budgets/history/utils';

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
    view  = 'men';
    item = {
      foo: 'bar'
    };
    item2 = {
      foo: 'qaz'
    };
  });

  it('should push multiple item into a view', () => {
    const action = store.dispatch(actions.pushAction(view, item));
    expect(action).toBe(item);

    store.dispatch(actions.pushAction(view, item));

    const expectedActions = [
      {
        type: 'HISTORY_PUSH',
        view: 'men',
        viewInfo: {
          currentIndex: 1,
          history: [{ foo: 'bar' }, { foo: 'bar' }],
          length: 2,
          redoDisabled: true,
          undoDisabled: false
        }
      },
      {
        type: 'HISTORY_PUSH',
        view: 'men',
        viewInfo: {
          currentIndex: 1,
          history: [{ foo: 'bar' }, { foo: 'bar' }],
          length: 2,
          redoDisabled: true,
          undoDisabled: false
        }
      }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should go back to the latest item (undo)', () => {
    const action = store.dispatch(actions.pushAction(view, item));
    expect(action).toBe(item);

    store.dispatch(actions.pushAction(view, item2));

    const foo = store.dispatch(actions.goBackAction(view));

    expect(foo).toBe(item);

    const reducerActions = store.getActions();

    expect(reducerActions[reducerActions.length - 1]).toHaveProperty('viewInfo');
    expect(reducerActions[reducerActions.length - 1]).toHaveProperty('viewInfo.redoDisabled', false);
    expect(reducerActions[reducerActions.length - 1]).toHaveProperty('viewInfo.currentIndex', 2);
  });

  it('Should go forward (redo)', () => {
    const foo = store.dispatch(actions.goForwardAction(view));

    expect(foo).toBe(item2);

    const reducerActions = store.getActions();

    expect(reducerActions[reducerActions.length - 1]).toHaveProperty('viewInfo');
    expect(reducerActions[reducerActions.length - 1]).toHaveProperty('viewInfo.currentIndex', 3);
  });
});
