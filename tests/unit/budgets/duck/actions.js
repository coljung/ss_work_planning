import actions from '../../../../app/budgets/duck/actions';
import types from '../../../../app/budgets/duck/types';

describe('Budget view action creators', () => {
    it('Should handle requestBudgetConfigData', () => {
        const expectedAction = {
            type: types.REQUEST_BUDGETS_CONFIG_DATA
        };
        expect(actions.requestBudgetConfigData()).toEqual(expectedAction);
    });

    it('Should handle receiveBudgetConfigData', () => {
        const config = 'test';
        const expectedAction = {
            type: types.RECEIVE_BUDGETS_CONFIG_DATA,
            config
        };
        expect(actions.receiveBudgetConfigData(config)).toEqual(expectedAction);
    });

    it('Should handle requestBudgetViewData', () => {
        const expectedAction = {
            type: types.REQUEST_BUDGETS_DATA
        };
        expect(actions.requestBudgetViewData()).toEqual(expectedAction);
    });

    it('Should handle receiveBudgetViewData', () => {
        const viewData = {
            foo: 'Bar'
        };
        const view = 'test';
        const expectedAction = {
            type: types.RECEIVE_BUDGETS_DATA,
            viewData,
            view
        };
        expect(actions.receiveBudgetViewData(viewData, view)).toEqual(expectedAction);
    });

    it('Should handle requestSendDataForSpreading', () => {
        const expectedAction = {
            type: types.REQUEST_SPREAD_DATA
        };
        expect(actions.requestSendDataForSpreading()).toEqual(expectedAction);
    });

    it('Should handle receiveSendDataForSpreading', () => {
        const expectedAction = {
            type: types.RECEIVE_SPREAD_DATA,
        };
        expect(actions.receiveSendDataForSpreading()).toEqual(expectedAction);
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

        expect(actions.requestViewDownload(budget, view, metrics, plans)).toEqual(expectedAction);
    });
});
