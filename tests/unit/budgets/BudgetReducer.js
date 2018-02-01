import reducer from '../../../app/budgets/BudgetReducer';
import * as actions from '../../../app/budgets/BudgetActions';

describe.only('BudgetReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        budgets: [],
        seasons: [],
        budgetsFetched: false,
        seasonsFetched: false,
    })
  });

  it('should handle REQUEST_BUDGETS', () => {
    expect(
      reducer(undefined, {
        type: actions.REQUEST_BUDGETS
      })
    ).toEqual({
        budgets: [],
        seasons: [],
        budgetsFetched: false,
        seasonsFetched: false,
    })
  });

  it('should handle RECEIVE_BUDGETS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_BUDGETS,
        budgets: {
          data: [
            { foo: 'bar' }
          ]
        }
      })
    ).toEqual({
        budgets: [
          { foo: 'bar' }
        ],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: false,
    })
  });

  it('should handle RECEIVE_CREATE_BUDGET', () => {
    const state = {
        budgets: [
          { foo: 'bar' }
        ],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: false,
    };

    expect(
      reducer(state, {
        type: actions.RECEIVE_CREATE_BUDGET,
        budget: { hello: 'world' }
      })
    ).toEqual({
        budgets: [
          { foo: 'bar' },
          { hello: 'world' }
        ],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: false,
    })
  });

  it('should handle REQUEST_SEASONS OR RESET_SEASONS_VIEW', () => {
    const state = {
        budgets: [],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: true, // this will turn to false
    };

    expect(
      reducer(state, {
        type: actions.REQUEST_SEASONS
      })
    ).toEqual({
        budgets: [],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: false,
    })

    expect(
      reducer(state, {
        type: actions.RESET_SEASONS_VIEW
      })
    ).toEqual({
        budgets: [],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: false,
    })
  });

  it('should handle RECEIVE_SEASONS', () => {
    const state = {
        budgets: [
          { foo: 'bar' }
        ],
        seasons: [],
        budgetsFetched: true,
        seasonsFetched: false,
    };

    expect(
      reducer(state, {
        type: actions.RECEIVE_SEASONS,
        seasons: [{ name: 'season 1' }]
      })
    ).toEqual({
        budgets: [
          { foo: 'bar' }
        ],
        seasons: [{ name: 'season 1' }],
        budgetsFetched: true,
        seasonsFetched: true,
    })
  });
});
