import reducer from '../../../../app/budgets/sections/SectionReducers';
import * as actions from '../../../../app/budgets/sections/SectionActions';
import * as sinon from 'sinon';

let sandbox;
let initialState;

describe.skip('SectionReducer', () => {

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


});
