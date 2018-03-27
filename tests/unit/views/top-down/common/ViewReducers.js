import reducer from '../../../../../app/views/top-down/common/ViewReducers';
import * as actions from '../../../../../app/views/top-down/common/ViewActions';

import {
    RECEIVE_BUDGETS_VIEW
} from '../../../../../app/views/top-down/common/viewActions';

describe('BudgetViewReducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        viewData: [],
        viewDataFetched: false,
    })
  });

  it('should handle RESET_BUDGETS_VIE or REQUEST_BUDGETS_VIEW', () => {
    expect(
      reducer(undefined, {
          type: actions.RESET_BUDGETS_VIE,
      })
    ).toEqual({
        viewData: [],
        viewDataFetched: false,
    });

    expect(
        reducer(undefined, {
        type: actions.REQUEST_BUDGETS_VIEW,
    })
    ).toEqual({
        viewData: [],
        viewDataFetched: false,
    });
  });


  // it('should handle RECEIVE_BUDGETS_VIEW', () => {
  //   const setData = [];
  //   const test= {
  //       view: 'vi',
  //       viewData: 'vd'
  //   };
  // const state = {
  //     viewDataFetched: false,  // this will turn to false
  //     viewData:[],
  // }
  //   setData[test.view] = test.viewData;
  //   const expected = {
  //       viewDataFetched: true,
  //       viewData: {
  //           view: 'vi',
  //           viewData: 'vd'
  //       }
  //   };
  //
  //   const res = reducer(state, { type: RECEIVE_BUDGETS_VIEW, view: 'vi', viewData: {data: [{ foo: 'bar' }]}});
  //   console.log(res);
  //   expect(res).to.deep.equal(expected);

    // expect(
    //   reducer(undefined, {
    //     type: actions.RECEIVE_BUDGETS_VIEW,
    //     view: 'vi',
    //     viewData: {
    //       data: [
    //         { foo: 'bar' }
    //       ]
    //     }
    //   })
    // ).toEqual({
    //     viewDataFetched: true,
    //     viewData: {
    //         view: 'vi',
    //         viewData: 'vd'
    //     }
    // })
  // });

  // it('should handle RECEIVE_BUDGETS_VIEW', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actions.RECEIVE_BUDGETS_VIEW,
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

  // it('should handle RESET_BUDGETS_VIEW', () => {
  //   expect(
  //     reducer(undefined, {
  //       type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
  //     })
  //   ).toEqual({
  //       viewData: [],
  //       viewDataFetched: false,
  //   })
  // });

  // it('should handle RECEIVE_BUDGETS_SAVE_NEW_VERSION', () => {
  //   const state = {
  //       newVersion: null,
  //       versions: [],
  //   };
  //
  //   expect(
  //     reducer(state, {
  //       type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
  //       version: { hello: 'world' }
  //     })
  //   ).toEqual({
  //       newVersion: { hello: 'world' },
  //       versions: [],
  //   })
  // });
  //
  //
  //

});
