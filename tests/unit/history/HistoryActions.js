import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../app/budgets/history/HistoryActions';

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

  it('Should test go', () => {
    const viewInfo = { foo: 'bar' };
    const view  = 'men';

    const expectedAction = {
      type: actions.HISTORY_GO_BACK,
      view,
      viewInfo
    }

    expect(actions.go(actions.HISTORY_GO_BACK, view, viewInfo)).toEqual(expectedAction);
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
