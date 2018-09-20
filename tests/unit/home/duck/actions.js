import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../../app/ApiClient';
import clientMiddleware from '../../../../app/middleware/clientMiddleware';
import actions from '../../../../app/home/duck/actions';
import types from '../../../../app/home/duck/types';
import viewResponse from '../../../fixtures/budgetView.json';

const client = new ApiClient();
const middlewares = [thunk, clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('Home action creators', () => {
    const budget = 1;
    const view = 'total';
    const metrics = [ 'SALES' ];
    const plans = [ 'wp' ].map(x => ({
        plan: x,
        numberOfHistoricalYears: 5,
    }));

    const filters = {
        metrics,
        plans,
    };

    afterEach(() => {
        nock.cleanAll();
    });

    it('should fetchAvailableSeasons', async () => {
        nock(UI_PLANNING_HOST)
            .get('/api/planning/budgets/show/available')
            .reply(200, []);


        const expectedActions = [
            {type: 'REQUEST_SEASONS'},
            {result: [], type: 'RECEIVE_SEASONS'}
        ];

        const store = mockStore({});

        await store.dispatch(actions.fetchAvailableSeasons());

        expect(store.getActions()).toEqual(expectedActions);
    })

    it('should fetchBudgets', async () => {
        nock(UI_PLANNING_HOST)
            .get('/api/planning/budgets')
            .reply(200, []);


        const expectedActions = [
            {type: 'REQUEST_BUDGETS'},
            {result: [], type: 'RECEIVE_BUDGETS'}
        ];

        const store = mockStore({});

        await store.dispatch(actions.fetchBudgets());

        expect(store.getActions()).toEqual(expectedActions);
    })
    it('should createBudget', async () => {
        nock(UI_PLANNING_HOST)
            .post('/api/planning/budgets', {})
            .reply(200, []);


        const expectedActions = [
            {type: 'REQUEST_CREATE_BUDGET'},
            {result: [], type: 'RECEIVE_CREATE_BUDGET'}
        ];

        const store = mockStore({});

        await store.dispatch(actions.createBudget({}));

        expect(store.getActions()).toEqual(expectedActions);
    })
});
