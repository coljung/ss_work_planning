import reducer from '../../../app/views/BudgetViewReducer';
import * as actions from '../../../app/views/BudgetViewActions';

describe('BudgetViewReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        newVersion: null,
        versions: [],
    })
  });

  // it('should handle REQUEST_BUDGETS_SAVE', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION
  //     })
  //   ).toEqual({
  //       budgets: [],
  //       seasons: [],
  //       budgetsFetched: false,
  //       seasonsFetched: false,
  //   })
  // });
  //
  // it('should handle RECEIVE_BUDGETS', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actions.RECEIVE_BUDGETS,
  //       budgets: {
  //         data: [
  //           { foo: 'bar' }
  //         ]
  //       }
  //     })
  //   ).toEqual({
  //       budgets: [
  //         { foo: 'bar' }
  //       ],
  //       seasons: [],
  //       budgetsFetched: true,
  //       seasonsFetched: false,
  //   })
  // });



  // it('should handle REQUEST_BUDGETS_SAVE', () => {
  //   const state = {
  //       newVersion: [
  //         { foo: 'bar' }
  //       ],
  //       versions: [],
  //   };
  //
  //   expect(
  //     reducer(state, {
  //       type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
  //       newVersion: { hello: 'world' }
  //     })
  //   ).toEqual({
  //       newVersion: [
  //         { foo: 'bar' },
  //         { hello: 'world' }
  //       ],
  //       versions: [],
  //   })
  // });
  //




  //
  // it('should handle REQUEST_SEASONS OR RESET_SEASONS_VIEW', () => {
  //   const state = {
  //       budgets: [],
  //       seasons: [],
  //       budgetsFetched: true,
  //       seasonsFetched: true, // this will turn to false
  //   };
  //
  //   expect(
  //     reducer(state, {
  //       type: actions.REQUEST_SEASONS
  //     })
  //   ).toEqual({
  //       budgets: [],
  //       seasons: [],
  //       budgetsFetched: true,
  //       seasonsFetched: false,
  //   })
  //
  //   expect(
  //     reducer(state, {
  //       type: actions.RESET_SEASONS_VIEW
  //     })
  //   ).toEqual({
  //       budgets: [],
  //       seasons: [],
  //       budgetsFetched: true,
  //       seasonsFetched: false,
  //   })
  // });
  //
  // it('should handle RECEIVE_SEASONS', () => {
  //   const state = {
  //       budgets: [
  //         { foo: 'bar' }
  //       ],
  //       seasons: [],
  //       budgetsFetched: true,
  //       seasonsFetched: false,
  //   };
  //
  //   expect(
  //     reducer(state, {
  //       type: actions.RECEIVE_SEASONS,
  //       seasons: [{ name: 'season 1' }]
  //     })
  //   ).toEqual({
  //       budgets: [
  //         { foo: 'bar' }
  //       ],
  //       seasons: [{ name: 'season 1' }],
  //       budgetsFetched: true,
  //       seasonsFetched: true,
  //   })
  // });
});
