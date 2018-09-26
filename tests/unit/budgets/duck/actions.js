import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../../app/ApiClient';
import clientMiddleware from '../../../../app/middleware/clientMiddleware';
import actions from '../../../../app/budgets/duck/actions';
import types from '../../../../app/budgets/duck/types';

const client = new ApiClient();
const middlewares = [thunk, clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('Budget view action creators', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Should handle fetchBudgetConfigData', async () => {
        nock(UI_PLANNING_HOST)
            .get('/api/planning/config')
            .reply(200, []);

        const expectedActions = [
            {type: 'REQUEST_BUDGETS_CONFIG_DATA'},
            {result: [], type: 'RECEIVE_BUDGETS_CONFIG_DATA'}
        ];

        const store = mockStore({});

        await store.dispatch(actions.fetchBudgetConfigData());

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should handle fetchBudgetMetricData', async () => {
        const budget = 1;
        const view = 'total';

        const response = {
            data: [],
            headers: [],
            info: {}
        };

        nock(UI_PLANNING_HOST)
            .get(`/api/planning/budgets/${budget}/${view}`)
            .reply(200, response);

        const expectedActions = [
            {
                 type :  'REQUEST_BUDGETS_DATA',
                 view : 'total',
            },
            {
                 result : response,
                 type :  'RECEIVE_BUDGETS_DATA',
                 view : 'total',
            }]

        const store = mockStore({});

        await store.dispatch(actions.fetchBudgetMetricData(budget, view));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should handle sendDataForSpreading', async () => {
        const budget = 1;
        const view = 'total';
        const updatedObj = { value: 10 };

        const body = {
            ...updatedObj,
            value: updatedObj.value === 0 ? 0.0001 : updatedObj.value,
        };

        nock(UI_PLANNING_HOST)
            .put(`/api/planning/budgets/${budget}/${view}`, body)
            .reply(200, []);

        const expectedActions = [
            {type: 'REQUEST_SPREAD_DATA', view},
            {result: [], type: 'RECEIVE_SPREAD_DATA', view}
        ];

        const store = mockStore({});

        await store.dispatch(actions.sendDataForSpreading(budget, view, updatedObj));

        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Should handle resetState', () => {
        const expectedAction = {
            type: types.RESET_BUDGETS_DATA
        };
        expect(actions.resetState()).toEqual(expectedAction);
    });

    it('Should handle filterSetup', () => {
        const filters = 'test';
        const expectedAction = {
            type: types.SET_FILTER_SETUP,
            filters
        };
        expect(actions.filterSetup(filters)).toEqual(expectedAction);
    });

    it('Should handle requestViewDownload', () => {
        const budget = 1;
        const view = 'total';
        const metrics = [ 'SALES' ];
        const plans = [ 'wp' ];

        const expectedAction = {
            type: types.REQUEST_VIEW_DOWNLOAD,
            budgetId: budget,
            view,
            metrics,
            plans
        };

        expect(actions.requestViewDownload(budget, view, {metrics, plans})).toEqual(expectedAction);
    });
});
