import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as notifications from 'notifications/NotificationActions';
import { budgetViewOperations } from '../../../../app/budgets/duck';
import types from '../../../../app/budgets/duck/types';
import configResponse from '../../../fixtures/config.json';
import viewResponse from '../../../fixtures/budgetView.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Budget view operations', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe('fetchBudgetConfigData', () => {
        it('Should handle fetchBudgetConfigData', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/config')
                .reply(200, configResponse);

            const expectedActions = [
                { type: types.REQUEST_BUDGETS_CONFIG_DATA },
                { type: types.RECEIVE_BUDGETS_CONFIG_DATA, config: configResponse }
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.fetchBudgetConfigData());

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should fail to fetchBudgetConfigData', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/config')
                .reply(500);

            const expectedActions = [
                { type: types.REQUEST_BUDGETS_CONFIG_DATA },
                { type: notifications.MESSAGES }
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.fetchBudgetConfigData());

            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });

    describe('sendDataForSpreading', () => {
        it('Should handle spreading with 0 value', async () => {
            const payload = {
                metric: "SALES",
                plan: "wp",
                value: 0,
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            const adjustedPayload = {
                metric: "SALES",
                plan: "wp",
                value: 0.0001,
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            nock(UI_PLANNING_HOST)
                .put('/api/planning/budgets/2/men/metrics', adjustedPayload)
                .reply(200);

            const expectedActions = [
                { type: types.REQUEST_SPREAD_DATA },
                { type: types.RECEIVE_SPREAD_DATA }
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.sendDataForSpreading(2, 'men', payload));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should handle sendDataForSpreading', async () => {
            const payload = {
                metric: "SALES",
                plan: "wp",
                value: 12,
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            nock(UI_PLANNING_HOST)
                .put('/api/planning/budgets/2/men/metrics', payload)
                .reply(200);

            const expectedActions = [
                { type: types.REQUEST_SPREAD_DATA },
                { type: types.RECEIVE_SPREAD_DATA }
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.sendDataForSpreading(2, 'men', payload));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should fail to spread', async () => {
            const payload = {
                metric: "SALES",
                plan: "wp",
                value: 12,
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            nock(UI_PLANNING_HOST)
                .put('/api/planning/budgets/2/men/metrics', payload)
                .reply(500);

            const expectedActions = [
                { type: types.REQUEST_SPREAD_DATA },
                { type: types.RECEIVE_SPREAD_DATA },
                { type: notifications.MESSAGES }
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.sendDataForSpreading(2, 'men', payload));

            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });

    describe('fetchBudgetMetricData', () => {
        const budget = 1;
        const view = 'total';
        const metrics = [ 'SALES' ];
        const plans = [ 'wp' ];
        const filters = {
            metrics,
            plans: plans.map(x => ({
                plan: x,
                numberOfHistoricalYears: 5,
            })),
        };

        it('Should handle fetching budget data ', async () => {
            nock(UI_PLANNING_HOST)
                .post('/api/planning/budgets/1/total/metrics', filters)
                 .reply(200, viewResponse);

            const expectedActions = [
                { type: types.REQUEST_BUDGETS_DATA },
                { type: types.RECEIVE_BUDGETS_DATA, viewData: viewResponse, view },
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.fetchBudgetMetricData(budget, view, metrics, plans));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should fail to fetchBudgetMetricData', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/budgets/1/total/metrics?metrics=SALES')
                .reply(500);

            const expectedActions = [
                { type: types.REQUEST_BUDGETS_DATA },
                { type: notifications.MESSAGES }
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.fetchBudgetMetricData(budget, view, metrics, plans));

            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });

    describe('getViewExportFile', () => {
        const budget = 1;
        const view = 'total';
        const metrics = [ 'SALES' ];
        const plans = [ 'wp','achd' ];

        it('Should handle exporting', async () => {
            window.open = jest.fn();

            const expectedActions = [
                { type: types.REQUEST_VIEW_DOWNLOAD, budgetId: budget, view, metrics, plans },
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.getViewExportFile(budget, view, metrics, plans));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should call window.open while exporting', async () => {
            const openSpy = window.open = jest.fn();

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.getViewExportFile(budget, view, metrics, plans));

            expect(openSpy).toHaveBeenCalledTimes(1);
            expect(openSpy).toBeCalledWith('http://127.0.0.1/api/planning/budgets/1/total/metrics/export?metrics=SALES&plans=wp,achd');
        });

        it('Should call window.open while exporting for multiple metrics, multiple plan type', async () => {
            const metrics = [ 'SALES', 'COGS' ];
            const plans = [ 'wp', 'achd' ];
            const openSpy = window.open = jest.fn();

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.getViewExportFile(budget, view, metrics, plans));

            expect(openSpy).toHaveBeenCalledTimes(1);
            expect(openSpy).toBeCalledWith('http://127.0.0.1/api/planning/budgets/1/total/metrics/export?metrics=SALES,COGS&plans=wp,achd');
        });
    });

    describe('filterSetup', () => {
        it('Should handle dispatching filters ', async () => {
            const filters = [ 'test' ];

            const expectedActions = [
                { type: types.SET_FILTER_SETUP, filters: filters },
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.filterSetup(filters));

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('resetState', () => {
        it('Should handle resetting state ', async () => {
            const expectedActions = [
                { type: types.RESET_BUDGETS_DATA },
            ];

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.resetState());

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});