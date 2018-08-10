import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import i18n from 'i18next';
import { homeOperations } from '../../../../app/home/duck';
import types from '../../../../app/home/duck/types';
import budgetResponse from '../../../fixtures/budgets.json';
import seasonAvailableResponse from '../../../fixtures/season_available.json';
import createBudgetResponse from '../../../fixtures/create_budget.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Home operations', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Should fetchBudgets', () => {
        nock(UI_PLANNING_HOST)
        .get('/api/planning/budgets')
        .query(true)
        .reply(200, budgetResponse);

        const expectedActions = [
            { type: types.REQUEST_BUDGETS },
            { type: types.RECEIVE_BUDGETS, budgets: budgetResponse }
        ];

        const store = mockStore({});

        return store.dispatch(homeOperations.fetchBudgets()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('Should failed fetchBudgets', () => {
        nock(UI_PLANNING_HOST)
        .get('/api/planning/budgets')
        .query(true)
        .reply(500, {
            code: 'Foo Bar',
            message: 'Foo Bar'
        });

        const expectedActions = [
            { type: types.REQUEST_BUDGETS },
            { type: 'MESSAGES' }
        ];

        const store = mockStore({});

        return store.dispatch(homeOperations.fetchBudgets()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        });
    });

    it('Should fetchAvailableSeasons', () => {
        nock(UI_PLANNING_HOST)
        .get('/api/planning/budgets/show/available')
        .query(true)
        .reply(200, seasonAvailableResponse);

        const expectedActions = [
            { type: types.REQUEST_SEASONS },
            { type: types.RECEIVE_SEASONS, seasons: seasonAvailableResponse }
        ];

        const store = mockStore({});

        return store.dispatch(homeOperations.fetchAvailableSeasons()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('Should fail to fetchAvailableSeasons', () => {
        nock(UI_PLANNING_HOST)
        .get('/api/planning/budgets/show/available')
        .query(true)
        .reply(500, {
            code: 'Foo Bar',
            message: 'Foo Bar'
        });

        const expectedActions = [
            { type: types.REQUEST_SEASONS },
            { type: 'MESSAGES' }
        ];

        const store = mockStore({});

        return store.dispatch(homeOperations.fetchAvailableSeasons()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        });
    });

    it('Should createBudget', async () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('home.notification.budgetCreated').returns('Budget created successfully!');

        const budget = {
            year: '2020',
            season: 'FW'
        };
        const message = {
            content: 'Budget created successfully!',
            isError: false,
            messageType: 'success',
            response: ''
        };

        nock(UI_PLANNING_HOST)
        .post('/api/planning/budgets', budget)
        .reply(201, createBudgetResponse);

        const expectedActions = [
            { type: types.REQUEST_CREATE_BUDGET, budget },
            { type: 'MESSAGES', message},
            { type: types.RECEIVE_CREATE_BUDGET, budget: createBudgetResponse }
        ];

        const store = mockStore({});

        await store.dispatch(homeOperations.createBudget(budget)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });

        i18nStub.restore();
    });

    it('Should fail to create budget', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('home.notification.budgetCreated').returns('Budget created successfully!');

        const budget = {
            year: '2020',
            season: 'FW'
        };

        nock(UI_PLANNING_HOST)
            .post('/api/planning/budgets', budget)
            .reply(500, {
                code: 'Foo Bar',
                message: 'Foo Bar'
            });

        const expectedActions = [
            { type: types.REQUEST_CREATE_BUDGET },
            { type: 'MESSAGES' }
        ];

        const store = mockStore({});

        return store.dispatch(homeOperations.createBudget(budget)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        });
    });
});
