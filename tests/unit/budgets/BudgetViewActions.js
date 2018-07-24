import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../app/budgets/BudgetViewActions';
import * as notifications from 'notifications/NotificationActions';
import configResponse from '../../fixtures/config.json';
import viewResponse from '../../fixtures/budgetView.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('BudgetViewActions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({ BudgetViewActions: [] });
    });

    afterEach(() => {
        nock.cleanAll();
    });

    describe('budget config data', () => {
        it('Should handle requestBudgetConfigData', () => {
            const expectedAction = {
                type: actions.REQUEST_BUDGETS_CONFIG_DATA
            };
            expect(actions.requestBudgetConfigData()).toEqual(expectedAction);
        });

        it('Should handle receiveBudgetConfigData', () => {
            const config = 'test';
            const expectedAction = {
                type: actions.RECEIVE_BUDGETS_CONFIG_DATA,
                config
            };
            expect(actions.receiveBudgetConfigData(config)).toEqual(expectedAction);
        });

        it('Should handle fetchBudgetConfigData', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/config')
                .reply(200, configResponse);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_CONFIG_DATA },
                { type: actions.RECEIVE_BUDGETS_CONFIG_DATA, config: configResponse }
            ];

            await store.dispatch(actions.fetchBudgetConfigData());

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should fail to fetchBudgetConfigData', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/config')
                .reply(500);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_CONFIG_DATA },
                { type: notifications.MESSAGES }
            ];

            await store.dispatch(actions.fetchBudgetConfigData());

            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });

    describe('budget view data', () => {
        it('Should handle requestBudgetViewData', () => {
            const expectedAction = {
                type: actions.REQUEST_BUDGETS_DATA
            };
            expect(actions.requestBudgetViewData()).toEqual(expectedAction);
        });

        it('Should handle receiveBudgetViewData', () => {
            const viewData = {
                foo: 'Bar'
            };
            const view = 'test';
            const expectedAction = {
                type: actions.RECEIVE_BUDGETS_DATA,
                viewData,
                view
            };
            expect(actions.receiveBudgetViewData(viewData, view)).toEqual(expectedAction);
        });
    });

    describe('spreading', () => {
        it('Should handle requestSendDataForSpreading', () => {
            const expectedAction = {
                type: actions.REQUEST_SPREAD_DATA
            };
            expect(actions.requestSendDataForSpreading()).toEqual(expectedAction);
        });

        it('Should handle receiveSendDataForSpreading', () => {
            const expectedAction = {
                type: actions.RECEIVE_SPREAD_DATA,
            };
            expect(actions.receiveSendDataForSpreading()).toEqual(expectedAction);
        });

        it('Should handle spreading with 0 value', async () => {
            const payload = {
                metric: "SALES",
                plan: "wp",
                value: "0",
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            nock(UI_PLANNING_HOST)
                .put('/api/planning/budgets/2/men/metrics', payload)
                .reply(200);

            const expectedActions = [
                { type: actions.REQUEST_SPREAD_DATA },
                { type: actions.RECEIVE_SPREAD_DATA }
            ];

            await store.dispatch(actions.sendDataForSpreading(2, 'men', payload));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should handle sendDataForSpreading', async () => {
            const payload = {
                metric: "SALES",
                plan: "wp",
                value: "12",
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            nock(UI_PLANNING_HOST)
                .put('/api/planning/budgets/2/men/metrics', payload)
                .reply(200);

            const expectedActions = [
                { type: actions.REQUEST_SPREAD_DATA },
                { type: actions.RECEIVE_SPREAD_DATA }
            ];

            await store.dispatch(actions.sendDataForSpreading(2, 'men', payload));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should fail to spread', async () => {
            const payload = {
                metric: "SALES",
                plan: "wp",
                value: "12",
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false,
            };

            nock(UI_PLANNING_HOST)
                .put('/api/planning/budgets/2/men/metrics', payload)
                .reply(500);

            const expectedActions = [
                { type: actions.REQUEST_SPREAD_DATA },
                { type: actions.RECEIVE_SPREAD_DATA },
                { type: notifications.MESSAGES }
            ];

            await store.dispatch(actions.sendDataForSpreading(2, 'men', payload));

            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });

    describe('reset state', () => {
        it('Should handle resetState', () => {
            const expectedAction = {
                type: actions.RESET_BUDGETS_DATA
            };
            expect(actions.resetState()).toEqual(expectedAction);
        });
    });

    describe('filter', () => {
        it('Should handle filterSetup', () => {
            const filters = 'test';
            const expectedAction = {
                type: actions.SET_FILTER_SETUP,
                filters
            };
            expect(actions.filterSetup(filters)).toEqual(expectedAction);
        });
    });

    describe('trigger change', () => {
        it('Should handle triggerChange', () => {
            const expectedAction = {
                type: actions.SET_TRIGGER_CHANGE,
            };
            expect(actions.triggerChange()).toEqual(expectedAction);
        });
    });

    describe('budget data', () => {
        const budget = 1;
        const view = 'total';
        const metric = [ 'SALES' ];
        const query = undefined;

        it('Should handle fetching budget data ', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/budgets/1/total/metrics?metrics=SALES')
                .reply(200, viewResponse);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_DATA },
                { type: actions.RECEIVE_BUDGETS_DATA, viewData: viewResponse, view },
            ];

            await store.dispatch(actions.fetchBudgetMetricData(budget, view, metric, query));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should handle fetching budget data for multiple metrics', async () => {
            const metrics = [ 'SALES', 'COGS' ];

            nock(UI_PLANNING_HOST)
                .get('/api/planning/budgets/1/total/metrics?metrics=SALES%2CCOGS')
                .reply(200, viewResponse);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_DATA },
                { type: actions.RECEIVE_BUDGETS_DATA, viewData: viewResponse, view },
            ];

            await store.dispatch(actions.fetchBudgetMetricData(budget, view, metrics, query));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should handle fetching budget data for metrics with query string', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/budgets/1/total/metrics?plan=wp&metrics=SALES')
                .reply(200, viewResponse);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_DATA },
                { type: actions.RECEIVE_BUDGETS_DATA, viewData: viewResponse, view },
            ];

            await store.dispatch(actions.fetchBudgetMetricData(budget, view, metric, { plan: 'wp' }));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should handle fetching budget data for metrics with metrics in query string', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/budgets/1/total/metrics?metrics=COGS')
                .reply(200, viewResponse);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_DATA },
                { type: actions.RECEIVE_BUDGETS_DATA, viewData: viewResponse, view },
            ];

            await store.dispatch(actions.fetchBudgetMetricData(budget, view, [ 'SALES' ], { metrics: 'COGS' }));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should fail to fetchBudgetMetricData', async () => {
            nock(UI_PLANNING_HOST)
                .get('/api/planning/budgets/1/total/metrics?metrics=SALES')
                .reply(500);

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_DATA },
                { type: notifications.MESSAGES }
            ];

            await store.dispatch(actions.fetchBudgetMetricData(budget, view, metric, query));

            expect(store.getActions()).toMatchObject(expectedActions);
        });
    });

    describe('export to excel', () => {
        const budget = 1;
        const view = 'total';
        const metric = [ 'SALES' ];

        it('Should handle requestViewDownload', () => {
            const expectedAction = {
                type: actions.REQUEST_VIEW_DOWNLOAD,
                budgetId: budget,
                view,
                metric
            };

            expect(actions.requestViewDownload(budget, view, metric)).toEqual(expectedAction);
        });

        it('Should handle exporting', async () => {
            window.open = jest.fn();

            const expectedActions = [
                { type: actions.REQUEST_VIEW_DOWNLOAD, budgetId: budget, view, metric },
            ];

            await store.dispatch(actions.getViewExportFile(budget, view, metric));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should call window.open while exporting', async () => {
            const openSpy = window.open = jest.fn();

            await store.dispatch(actions.getViewExportFile(budget, view, metric));

            expect(openSpy).toHaveBeenCalledTimes(1);
            expect(openSpy).toBeCalledWith('http://127.0.0.1/api/planning/budgets/1/total/metrics/export?metrics=SALES');
        });

        it('Should call window.open while exporting for multiple metrics', async () => {
            const metrics = [ 'SALES', 'COGS' ];

            const openSpy = window.open = jest.fn();

            await store.dispatch(actions.getViewExportFile(budget, view, metrics));

            expect(openSpy).toHaveBeenCalledTimes(1);
            expect(openSpy).toBeCalledWith('http://127.0.0.1/api/planning/budgets/1/total/metrics/export?metrics=SALES,COGS');
        });
    });
});
