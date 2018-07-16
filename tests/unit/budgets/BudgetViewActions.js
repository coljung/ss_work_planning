import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { join } from 'path';
import * as actions from '../../../app/budgets/BudgetViewActions';
import configResponse from '../../fixtures/config.json';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('BudgetViewActions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe('Action Creators', () => {

        it('Should handle requestBudgetVersions', () => {
            const expectedAction = {
                type: actions.REQUEST_BUDGETS_VERSIONS
            };
            expect(actions.requestBudgetVersions()).toEqual(expectedAction);
        });

        it('Should handle receiveBudgetVersions', () => {
            const versions = {
                foo: 'Bar'
            };
            const expectedAction = {
                type: actions.RECEIVE_BUDGETS_VERSIONS,
                versions
            };
            expect(actions.receiveBudgetVersions(versions)).toEqual(expectedAction);
        });

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

        it('Should handle resetState', () => {
            const expectedAction = {
                type: actions.RESET_BUDGETS_DATA
            };
            expect(actions.resetState()).toEqual(expectedAction);
        });

        it('Should handle fetchBudgetConfigData', () => {
            nock(UI_PLANNING_HOST)
            .get('/api/planning/config')
            .replyWithFile(200, join(__dirname, '../..', 'fixtures', 'config.json'), {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_CONFIG_DATA },
                { type: actions.RECEIVE_BUDGETS_CONFIG_DATA, config: configResponse }
            ];
            const store = mockStore({ BudgetViewActions: [] });

            return store.dispatch(actions.fetchBudgetConfigData()).then(() =>{
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('Should handle sendDataForSpreading', () => {
            nock(UI_PLANNING_HOST)
            .put('/api/planning/budgets/2/versions/V1/men/metrics', {
                metric: "SALES",
                dataRow: "wp",
                value: "12",
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false })
            .reply(200);

            const expectedActions = [
                { type: actions.REQUEST_SPREAD_DATA },
                { type: actions.RECEIVE_SPREAD_DATA }
            ];
            const store = mockStore({ BudgetViewActions: [] });

            return store.dispatch(actions.sendDataForSpreading(2, 'V1', 'men', {
                metric: "SALES",
                dataRow: "wp",
                value: "12",
                key: "root.SALES.2018.2018.7",
                dataType: "currency",
                isReadOnly: false } )).then(() =>{
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('Should fail to fetchBudgetConfigData', () => {
            nock(UI_PLANNING_HOST)
            .get('/api/planning/config')
            .reply(500, {
                code: 'Foo Bar',
                message: 'Foo Bar'
            }, {
                'Content-Type': 'application/json'
            });

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_CONFIG_DATA },
                { type: 'MESSAGES' }
            ];

            const store = mockStore({ BudgetViewActions: [] });

            return store.dispatch(actions.fetchBudgetConfigData()).then(() =>{
                expect(store.getActions()).toMatchObject(expectedActions)
            })
        });


        it('Should handle getViewExportFile', () => {
            const expectedAction = {
                type: actions.REQUEST_VIEW_DOWNLOAD
            };
            expect(actions.requestViewDownload()).toEqual(expectedAction);
        });
    });
});
