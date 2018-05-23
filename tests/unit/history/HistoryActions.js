import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../app/views/history/HistoryActions';



describe('History Actions', () => {
  let middlewares;
  let mockStore;

  beforeAll(() => {
    middlewares = [thunk];
    mockStore = configureMockStore(middlewares);
  });

  it('Should test push', () => {
    const view  = 'men';
    const item = {
      foo: 'bar'
    };

    const expectedAction = {
      type: actions.HISTORY_PUSH,
      view,
      viewInfo: item
    }

    expect(actions.push(view, item)).toEqual(expectedAction);
  });

  it('Should test replace', () => {
    const n = 0;
    const view  = 'men';
    const item = {
      foo: 'bar'
    };

    const expectedAction = {
      type: actions.HISTORY_REPLACE,
      view,
      n,
      item
    }

    expect(actions.replace(view, n, item)).toEqual(expectedAction);
  });

  it('Should test go', () => {
    const n = 0;
    const view  = 'men';

    const expectedAction = {
      type: actions.HISTORY_GO,
      view,
      n
    }

    expect(actions.go(view, n)).toEqual(expectedAction);
  });

  it('Should test goBack', () => {
    const view  = 'men';

    const expectedAction = {
      type: actions.HISTORY_GO_BACK,
      view
    }

    expect(actions.goBack(view)).toEqual(expectedAction);
  });

  it('Should test goForward', () => {
    const view  = 'men';

    const expectedAction = {
      type: actions.HISTORY_GO_FORWARD,
      view
    }

    expect(actions.goForward(view)).toEqual(expectedAction);
  });
});
