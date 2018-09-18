import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as notifications from 'notifications/NotificationActions';
import { budgetViewOperations } from '../../../../app/budgets/duck';
import types from '../../../../app/budgets/duck/types';
import ApiClient from '../../../../app/ApiClient';
import clientMiddleware from '../../../../app/middleware/clientMiddleware';
import configResponse from '../../../fixtures/config.json';
import viewResponse from '../../../fixtures/budgetView.json';

const client = new ApiClient();
const middlewares = [thunk, clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('Budget view operations', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe('getViewExportFile', () => {
        const budgetId = 1;
        const view = 'total';
        const plans = [ 'wp' ].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));
        let filter = {metrics: ['SALES'], plans};
        it('Should handle exporting', async () => {
            window.open = jest.fn();

            const expectedActions = [
                { type: types.REQUEST_VIEW_DOWNLOAD, budgetId, view, metrics: filter.metrics, plans: filter.plans },
            ];
            const store = mockStore({});

            await store.dispatch(budgetViewOperations.getViewExportFile(budgetId, view, filter));

            expect(store.getActions()).toEqual(expectedActions);
        });

        it('Should call window.open while exporting', async () => {
            const openSpy = window.open = jest.fn();

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.getViewExportFile(budgetId, view, filter));

            expect(openSpy).toHaveBeenCalledTimes(1);
            expect(openSpy).toBeCalledWith(`http://127.0.0.1/api/planning/budgets/1/total/export?query={\"metrics\":[\"SALES\"],\"plans\":[{\"plan\":\"wp\",\"numberOfHistoricalYears\":5}]}`);
        });

        it('Should call window.open while exporting for multiple metrics, multiple plan type', async () => {
            filter.metrics = [ 'SALES', 'COGS' ];
            filter.plans = [ 'wp', 'achd' ].map(x => ({
                plan: x,
                numberOfHistoricalYears: 5,
            }));
            const openSpy = window.open = jest.fn();

            const store = mockStore({});

            await store.dispatch(budgetViewOperations.getViewExportFile(budgetId, view, filter));

            expect(openSpy).toHaveBeenCalledTimes(1);
            expect(openSpy).toBeCalledWith(`http://127.0.0.1/api/planning/budgets/1/total/export?query={\"metrics\":[\"SALES\",\"COGS\"],\"plans\":[{\"plan\":\"wp\",\"numberOfHistoricalYears\":5},{\"plan\":\"achd\",\"numberOfHistoricalYears\":5}]}`);
        });
    });
});
