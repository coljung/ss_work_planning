import reducer from '../../../app/budgets/BudgetViewReducer';
import * as actions from '../../../app/budgets/BudgetViewActions';

describe('BudgetViewReducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        newVersion: null,
        versions: [],
    })
  });

  it('should handle RECEIVE_BUDGETS_SAVE_NEW_VERSION', () => {
    const state = {
        newVersion: null,
        versions: [],
    };

    expect(
      reducer(state, {
        type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
        version: { hello: 'world' }
      })
    ).toEqual({
        newVersion: { hello: 'world' },
        versions: [],
    })
  });



  it('should handle RECEIVE_BUDGETS_VERSIONS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_BUDGETS_VERSIONS,
        versions: {
          data: [
            { foo: 'bar' }
          ]
        }
      })
    ).toEqual({
        versions: [
          { foo: 'bar' }
        ],
        newVersion: null
    })
  });

});
