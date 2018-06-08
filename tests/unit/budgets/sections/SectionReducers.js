import reducer from '../../../../app/budgets/sections/SectionReducers';
import * as actions from '../../../../app/budgets/sections/SectionActions';
import * as sinon from 'sinon';

let sandbox;
let initialState;

describe('SectionReducer', () => {

    beforeAll(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        initialState = {
            viewData: [],
            config: [],
            loading: false,
            viewDataFetched: false,
            refreshData: false,
            spreadingData: false,
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            viewData: [],
            config: [],
            loading: false,
            viewDataFetched: false,
            refreshData: false,
            spreadingData: false,
        })
    });

    it('should handle RESET_BUDGETS_VIE, REQUEST_BUDGETS_VIEW or REQUEST_BUDGETS_CONFIG_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.RESET_BUDGETS_VIEW,
                type: actions.REQUEST_BUDGETS_CONFIG_DATA,
            })
        ).toEqual(initialState);

        expect(
            reducer(undefined, {
                type: actions.REQUEST_BUDGETS_VIEW,
            })
        ).toEqual({
            viewData: [],
            config: [],
            loading: true,
            viewDataFetched: false,
            refreshData: false,
            spreadingData: false,
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
            loading: false,
            viewDataFetched: false,
            refreshData: true,
            spreadingData: false,
        });
    });

    it('should handle REQUEST_REFRESH_GRID_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_REFRESH_GRID_DATA,
            })
        ).toEqual({
            viewData: [],
            config: [],
            loading: true,
            viewDataFetched: false,
            refreshData: false,
            spreadingData: true,
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


});
