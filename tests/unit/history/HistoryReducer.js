import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer from '../../../app/history/HistoryReducer';
import * as actions from '../../../app/history/HistoryActions';



describe('History Reducer', () => {
  let middlewares;
  let mockStore;

  beforeAll(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('should push multiple item into a view', () => {
    const view  = 'men';
    const item = {
      foo: 'bar'
    };

    const action = actions.push(view, item);

    let state = reducer({}, action);

    state = reducer(state, action);
    state = reducer(state, action);

    expect(state).toHaveProperty(view);
    expect(state[view]).toHaveLength(3);

    state[view].forEach(stateItem => expect(stateItem).toEqual(item));
  });

  it.only('Should go back to the latest item', () => {
    const store = mockStore({ HistoryActions: {} });
    console.log('store', store.getState());
    const view  = 'men';

    const item = {
      foo: 'bar'
    };

    const action = store.dispatch(actions.pushAction(view, item));

    console.log('action', action);
    console.log('store', store.getState());

    // console.log('store', store.getState());
    //
    // let state = reducer(store.HistoryActions, action);
    //
    //
    //
    // console.log(store.dispatch);
    //
    // const goBackAction = store.dispatch(actions.goBackAction(view));
    //
    // console.log('res', goBackAction);
  });
});
