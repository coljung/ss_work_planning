import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../../app/views/top-down/common/ViewActions';

// import versionsResponse from '../../fixtures/versions.json';
// import versionsDuplicate from '../../fixtures/versionsDuplicate.json';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('BudgetViewActions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    describe('Action Creators', () => {

        it('Should handle requestBudgetViewData', () => {
            const expectedAction = {
                type: actions.REQUEST_BUDGETS_VIEW
            };
            expect(actions.requestBudgetViewData()).toEqual(expectedAction);
        });

        it('Should handle receiveBudgetViewData', () => {
            const viewData = {
                foo: 'Bar'
            };
            const view = 'test';
            const expectedAction = {
                type: actions.RECEIVE_BUDGETS_VIEW,
                viewData,
                view
            };
            expect(actions.receiveBudgetViewData(viewData, view)).toEqual(expectedAction);
        });

        it('Should handle requestBudgetSave', () => {
            const expectedAction = {
                type: actions.REQUEST_BUDGETS_SAVE_BUDGET
            };
            expect(actions.requestBudgetSave()).toEqual(expectedAction);
        });

        it('Should handle receiveBudgetSave', () => {
            const version = 'V2';
            const expectedAction = {
                type: actions.RECEIVE_BUDGETS_SAVE_BUDGET,
                version,
            };
            expect(actions.receiveBudgetSave(version)).toEqual(expectedAction);
        });

        it('Should handle resetState', () => {
            const expectedAction = {
                type: actions.RESET_BUDGETS_VIEW
            };
            expect(actions.resetState()).toEqual(expectedAction);
        });


        //
        // it('Should handle requestBudgetSaveNewVersion', () => {
        //     const expectedAction = {
        //         type: actions.REQUEST_BUDGETS_SAVE_NEW_VERSION
        //     };
        //     expect(actions.requestBudgetSaveNewVersion()).toEqual(expectedAction);
        // });
        //
        // it('Should handle receiveBudgetSaveNewVersion', () => {
        //     const version = {
        //         foo: 'Bar'
        //     };
        //     const expectedAction = {
        //         type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
        //         version
        //     };
        //     expect(actions.receiveBudgetSaveNewVersion(version)).toEqual(expectedAction);
        // });
        //
        // it('Should handle requestBudgetSave', () => {
        //     const expectedAction = {
        //         type: actions.REQUEST_BUDGETS_SAVE_BUDGET
        //     };
        //     expect(actions.requestBudgetSave()).toEqual(expectedAction);
        // });
        //
        // it('Should handle receiveBudgetSave', () => {
        //     const version = {
        //         foo: 'Bar'
        //     };
        //     const expectedAction = {
        //         type: actions.RECEIVE_BUDGETS_SAVE_BUDGET,
        //         version
        //     };
        //     expect(actions.receiveBudgetSave(version)).toEqual(expectedAction);
        // });
        //
        // it('Should handle budgetVersions', () => {
        //     nock(UI_PLANNING_HOST)
        //     .get('/api/planning/budgets/2/versions')
        //     .query(true)
        //     .replyWithFile(200, join(__dirname, '..', '..', 'fixtures', 'versions.json'), {
        //         'Content-Type': 'application/json'
        //     });
        //
        //     const expectedActions = [
        //         { type: actions.REQUEST_BUDGETS_VERSIONS },
        //         { type: actions.RECEIVE_BUDGETS_VERSIONS, versions: versionsResponse }
        //     ];
        //
        //     const store = mockStore({ BudgetViewActions: [] });
        //
        //     return store.dispatch(actions.budgetVersions(2)).then(() => {
        //         // return of async actions
        //         expect(store.getActions()).toEqual(expectedActions)
        //     })
        // });
        //
        // it('Should failed to budgetVersions', () => {
        //     nock(UI_PLANNING_HOST)
        //     .get('/api/planning/budgets/2/versions')
        //     .query(true)
        //     .reply(500, {
        //         code: 'Foo Bar',
        //         message: 'Foo Bar'
        //     }, {
        //         'Content-Type': 'application/json'
        //     });
        //
        //     const expectedActions = [
        //         { type: actions.REQUEST_BUDGETS_VERSIONS },
        //         { type: 'MESSAGES' }
        //     ];
        //
        //     const store = mockStore({ BudgetViewActions: [] });
        //
        //     return store.dispatch(actions.budgetVersions(2)).then(() => {
        //         // return of async actions
        //         expect(store.getActions()).toMatchObject(expectedActions)
        //     })
        // });
        //
        it('Should fail saveBudget', () => {
            nock(UI_PLANNING_HOST)
            .post('/api/planning/budgets/2/versions/2/men')
            .query(true)
            .reply(500, {
                code: 'Foo Bar',
                message: 'Foo Bar'
            }, {
                'Content-Type': 'application/json'
            });

            const message = {
                content: 'Error found',
                isError: true,
                messageType: 'error',
                response: undefined
            };

            const expectedActions = [
                { type: actions.REQUEST_BUDGETS_SAVE_BUDGET },
                { type: 'MESSAGES', message }
            ];

            const store = mockStore({ viewActions: [] });

            return store.dispatch(actions.saveBudget()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
        //
        // it('Should fail saveNewBudgetVersion', () => {
        //     nock(UI_PLANNING_HOST)
        //     .post('/api/planning/budgets/2/versions/duplicate')
        //     .query(true)
        //     .reply(500, {
        //         code: 'Foo Bar',
        //         message: 'Foo Bar'
        //     }, {
        //         'Content-Type': 'application/json'
        //     });
        //
        //     const message = {
        //         content: 'Error found',
        //         isError: true,
        //         messageType: 'error',
        //         response: undefined
        //     };
        //
        //     const expectedActions = [
        //         { type: actions.REQUEST_BUDGETS_SAVE_NEW_VERSION },
        //         { type: 'MESSAGES', message },
        //     ];
        //
        //     const store = mockStore({ BudgetViewActions: [] });
        //
        //     return store.dispatch(actions.saveNewBudgetVersion()).then(() => {
        //         // return of async actions
        //         expect(store.getActions()).toEqual(expectedActions)
        //     })
        // });

    });
});
