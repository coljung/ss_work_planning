import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { join } from 'path';
import getApiUrl from '../../../app/Helpers';
import * as actions from '../../../app/budgets/BudgetActions';

import budgetResponse from '../../fixtures/budgets.json';
import seasonAvailableResponse from '../../fixtures/season_available.json';
import createBudgetResponse from '../../fixtures/create_budget.json';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('BudgetActions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe('Action Creators', () => {
        it('Should test requestBudgets', () => {
            const expectedAction = {
                type: actions.REQUEST_BUDGETS
            };
            expect(actions.requestBudgets()).toEqual(expectedAction);
        });

        it('Should test receiveBudgets', () => {
            const budgets = {
                foo: 'Bar'
            };
            const expectedAction = {
                type: actions.RECEIVE_BUDGETS,
                budgets
            };
            expect(actions.receiveBudgets(budgets)).toEqual(expectedAction);
        });

        it('Should test requestSeasons', () => {
            const expectedAction = {
                type: actions.REQUEST_SEASONS
            };
            expect(actions.requestSeasons()).toEqual(expectedAction);
        });

        it('Should test receiveSeasons', () => {
            const seasons = {
                foo: 'Bar'
            };
            const expectedAction = {
                type: actions.RECEIVE_SEASONS,
                seasons
            };
            expect(actions.receiveSeasons(seasons)).toEqual(expectedAction);
        });

        it('Should test requestBudgetCreate', () => {
            const budget = {
                foo: 'Bar'
            };
            const expectedAction = {
                type: actions.REQUEST_CREATE_BUDGET,
                budget
            };
            expect(actions.requestBudgetCreate(budget)).toEqual(expectedAction);
        });

        it('Should test receiveBudgetCreate', () => {
            const budget = {
                foo: 'Bar'
            };
            const expectedAction = {
                type: actions.RECEIVE_CREATE_BUDGET,
                budget
            };
            expect(actions.receiveBudgetCreate(budget)).toEqual(expectedAction);
        });

        it('Should test resetState', () => {
            const expectedAction = {
                type: actions.RESET_SEASONS_VIEW
            };
            expect(actions.resetState()).toEqual(expectedAction);
        });
    });

    describe('Async Action Creators', () => {
        it('Should fetchBudgets', () => {
            nock(UI_PLANNING_HOST)
            .get('/api/planning/budgets')
            .query(true)
            .replyWithFile(200, join(__dirname, '..', '..', 'fixtures', 'budgets.json'), {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS },
                { type: actions.RECEIVE_BUDGETS, budgets: budgetResponse }
            ];

            const store = mockStore({ BudgetActions: [] });

            return store.dispatch(actions.fetchBudgets()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });

        it('Should failed fetchBudgets', () => {
            nock(UI_PLANNING_HOST)
            .get('/api/planning/budgets')
            .query(true)
            .reply(500, {
                code: 'Foo Bar',
                message: 'Foo Bar'
            }, {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS },
                { type: 'MESSAGES' }
            ];

            const store = mockStore({ BudgetActions: [] });

            return store.dispatch(actions.fetchBudgets()).then(() => {
                // return of async actions
                expect(store.getActions()).toMatchObject(expectedActions)
            })
        });

        it('Should fetchSeasons', () => {
            nock(UI_PLANNING_HOST)
            .get('/api/planning/budgets/show/available')
            .query(true)
            .replyWithFile(200, join(__dirname, '..', '..', 'fixtures', 'season_available.json'), {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_SEASONS },
                { type: actions.RECEIVE_SEASONS, seasons: seasonAvailableResponse }
            ];

            const store = mockStore({ BudgetActions: [] });

            return store.dispatch(actions.fetchSeasons()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });

        it('Should failed to fetchSeasons', () => {
            nock(UI_PLANNING_HOST)
            .get('/api/planning/budgets/show/available')
            .query(true)
            .reply(500, {
                code: 'Foo Bar',
                message: 'Foo Bar'
            }, {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_SEASONS },
                { type: 'MESSAGES' }
            ];

            const store = mockStore({ BudgetActions: [] });

            return store.dispatch(actions.fetchSeasons()).then(() => {
                // return of async actions
                expect(store.getActions()).toMatchObject(expectedActions)
            })
        });

        it('Should createBudget', () => {
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
            .log(console.log)
            .post('/api/planning/budgets', budget)
            .replyWithFile(201, join(__dirname, '..', '..', 'fixtures', 'create_budget.json'), {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_CREATE_BUDGET, budget },
                { type: actions.REQUEST_BUDGETS },
                { type: 'MESSAGES', message},
                { type: actions.RECEIVE_CREATE_BUDGET, budget: createBudgetResponse }
            ];

            const store = mockStore({ BudgetActions: [] });

            return store.dispatch(actions.createBudget(budget)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });
});
