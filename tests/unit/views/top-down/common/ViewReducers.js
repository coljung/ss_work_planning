import reducer from '../../../../../app/views/top-down/common/ViewReducers';
import * as actions from '../../../../../app/views/top-down/common/ViewActions';
import * as sinon from 'sinon';

let sandbox;
let initialState;

describe('BudgetViewReducer', () => {

    beforeAll(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        initialState = {
            viewData: [],
            config: [],
            viewDataFetched: false,
            refreshData: false,
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            viewData: [],
            config: [],
            viewDataFetched: false,
            refreshData: false,
        })
    });

    it('should handle RESET_BUDGETS_VIE, REQUEST_BUDGETS_VIEW or REQUEST_BUDGETS_CONFIG_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.RESET_BUDGETS_VIEW,
                type: actions.REQUEST_BUDGETS_CONFIG_DATA,
            })
        ).toEqual({
            viewData: [],
            config: [],
            viewDataFetched: false,
            refreshData: false,
        });

        expect(
            reducer(undefined, {
                type: actions.REQUEST_BUDGETS_VIEW,
            })
        ).toEqual({
            viewData: [],
            config: [],
            viewDataFetched: false,
            refreshData: false,
        });
    });

    it('should handle RECEIVE_BUDGETS_CONFIG_DATA', () => {
        const state = {
            config: null,
        };

        expect(
            reducer(state, {
                type: actions.RECEIVE_BUDGETS_CONFIG_DATA,
                config: { available_metrics: 'SALES' }
            })
        ).toEqual({
            config: { available_metrics: 'SALES' },
        })
    });

    it('should handle RECEIVE_REFRESH_GRID_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_REFRESH_GRID_DATA,
            })
        ).toEqual({
            viewData: [],
            config: [],
            viewDataFetched: false,
            refreshData: true,
        });
    });

    it('should handle RECEIVE_BUDGETS_VIEW', () => {
        const setData = [];
        const test= {
            view: 'women',
            viewData: 'vd'
        };
        const state = {
            viewDataFetched: false,  // this will turn to false
            viewData:[],
        }
        setData[test.view] = test.viewData;
        const expected = {
            viewDataFetched: true,
            viewData: {
                viewData: [
                    'women': [{ foo: 'bar' }]
                ]
            }
        };
        // TODO
        // const res = reducer(state, {
        //     type: actions.RECEIVE_BUDGETS_VIEW,
        //     view: 'women',
        //     viewData: [{ foo: 'bar' }],
        // });
        // console.log('------------', res.viewData);
        // console.log(res);
        // expect(res).toEqual(expected);
        //
        //
        // expect(
        //     reducer(state, {
        //         type: actions.RECEIVE_BUDGETS_VIEW,
        //         view: 'women',
        //         viewData: [{ foo: 'bar' }],
        //     })
        // ).toMatchObject({
        //     viewDataFetched: true,
        //     viewData: [
        //         'women': [{ foo: 'bar' }],
        //     ],
        //     refreshData: false,
        // })
    });

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
