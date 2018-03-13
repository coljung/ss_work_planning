import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { join } from 'path';
import getApiUrl from '../../../app/Helpers';
import * as actions from '../../../app/views/BudgetViewActions';

import versionsResponse from '../../fixtures/versions.json';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('BudgetViewActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Action Creators', () => {
    it('Should test requestBudgetVersions', () => {
      const expectedAction = {
        type: actions.REQUEST_BUDGETS_VERSIONS
      };
      expect(actions.requestBudgetVersions()).toEqual(expectedAction);
    });

    it('Should test receiveBudgetVersions', () => {
      const versions = {
        foo: 'Bar'
      };
      const expectedAction = {
        type: actions.RECEIVE_BUDGETS_VERSIONS,
        versions
      };
      expect(actions.receiveBudgetVersions(versions)).toEqual(expectedAction);
    });

    it('Should test requestBudgetSaveNewVersion', () => {
      const expectedAction = {
        type: actions.REQUEST_BUDGETS_SAVE_NEW_VERSION
      };
      expect(actions.requestBudgetSaveNewVersion()).toEqual(expectedAction);
    });

    it('Should test receiveBudgetSaveNewVersion', () => {
      const version = {
        foo: 'Bar'
      };
      const expectedAction = {
        type: actions.RECEIVE_BUDGETS_SAVE_NEW_VERSION,
        version
      };
      expect(actions.receiveBudgetSaveNewVersion(version)).toEqual(expectedAction);
    });

    it('Should test requestBudgetSave', () => {
      const expectedAction = {
        type: actions.REQUEST_BUDGETS_SAVE_BUDGET
      };
      expect(actions.requestBudgetSave()).toEqual(expectedAction);
    });

    it('Should test receiveBudgetSave', () => {
      const version = {
        foo: 'Bar'
      };
      const expectedAction = {
        type: actions.RECEIVE_BUDGETS_SAVE_BUDGET,
        version
      };
      expect(actions.receiveBudgetSave(version)).toEqual(expectedAction);
    });
    
  //
  //   it('Should test resetState', () => {
  //     const expectedAction = {
  //       type: actions.RESET_SEASONS_VIEW
  //     };
  //     expect(actions.resetState()).toEqual(expectedAction);
  //   });
  // });
  //
  // describe('Async Action Creators', () => {
  //   it('Should fetchBudgets', () => {
  //     nock(UI_PLANNING_HOST)
  //       .get('/api/planning/budgets')
  //       .query(true)
  //       .replyWithFile(200, join(__dirname, '..', '..', 'fixtures', 'budgets.json'), {
  //         'Content-Type': 'application/json'
  //       });
  //
  //     const expectedActions = [
  //       { type: actions.REQUEST_BUDGETS },
  //       { type: actions.RECEIVE_BUDGETS, budgets: budgetResponse }
  //     ];
  //
  //     const store = mockStore({ BudgetActions: [] });
  //
  //     return store.dispatch(actions.fetchBudgets()).then(() => {
  //       // return of async actions
  //       expect(store.getActions()).toEqual(expectedActions)
  //     })
  //   });
  //
  //   it('Should failed fetchBudgets', () => {
  //     nock(UI_PLANNING_HOST)
  //       .get('/api/planning/budgets')
  //       .query(true)
  //       .reply(500, {
  //         code: 'Foo Bar',
  //         message: 'Foo Bar'
  //       }, {
  //         'Content-Type': 'application/json'
  //       });
  //
  //     const expectedActions = [
  //       { type: actions.REQUEST_BUDGETS },
  //       { type: 'MESSAGES' }
  //     ];
  //
  //     const store = mockStore({ BudgetActions: [] });
  //
  //     return store.dispatch(actions.fetchBudgets()).then(() => {
  //       // return of async actions
  //       expect(store.getActions()).toMatchObject(expectedActions)
  //     })
  //   });
  //
    // it('Should fetchSeasons', () => {
    //   nock(UI_PLANNING_HOST)
    //     .get('/api/planning/budgets/2/versions')
    //     .query(true)
    //     .replyWithFile(200, join(__dirname, '..', '..', 'fixtures', 'versions.json'), {
    //       'Content-Type': 'application/json'
    //     });
    //
    //   const expectedActions = [
    //     { type: actions.REQUEST_BUDGETS_VERSIONS },
    //     { type: actions.RECEIVE_BUDGETS_VERSIONS, versions: versionsResponse }
    //   ];
    //
    //   const store = mockStore({ BudgetViewActions: [] });
    //
    //   return store.dispatch(actions.budgetVersions()).then(() => {
    //     // return of async actions
    //     expect(store.getActions()).toEqual(expectedActions)
    //   })
    // });
  //
  //   it('Should failed to fetchSeasons', () => {
  //     nock(UI_PLANNING_HOST)
  //       .get('/api/planning/budgets/show/available')
  //       .query(true)
  //       .reply(500, {
  //         code: 'Foo Bar',
  //         message: 'Foo Bar'
  //       }, {
  //         'Content-Type': 'application/json'
  //       });
  //
  //     const expectedActions = [
  //       { type: actions.REQUEST_SEASONS },
  //       { type: 'MESSAGES' }
  //     ];
  //
  //     const store = mockStore({ BudgetActions: [] });
  //
  //     return store.dispatch(actions.fetchSeasons()).then(() => {
  //       // return of async actions
  //       expect(store.getActions()).toMatchObject(expectedActions)
  //     })
  //   });
  //
  //   it('Should createBudget', () => {
  //     const budget = {
  //       year: '2020',
  //       season: 'FW'
  //     };
  //     const message = {
  //       content: 'Budget created successfully!',
  //       isError: false,
  //       messageType: 'success',
  //       response: ''
  //     };
  //
  //     nock(UI_PLANNING_HOST)
  //       .log(console.log)
  //       .post('/api/planning/budgets', budget)
  //       .replyWithFile(201, join(__dirname, '..', '..', 'fixtures', 'create_budget.json'), {
  //         'Content-Type': 'application/json'
  //       });
  //
  //     const expectedActions = [
  //       { type: actions.REQUEST_CREATE_BUDGET, budget },
  //       { type: actions.REQUEST_BUDGETS },
  //       { type: 'MESSAGES', message},
  //       { type: actions.RECEIVE_CREATE_BUDGET, budget: createBudgetResponse }
  //     ];
  //
  //     const store = mockStore({ BudgetActions: [] });
  //
  //     return store.dispatch(actions.createBudget(budget)).then(() => {
  //       // return of async actions
  //       expect(store.getActions()).toEqual(expectedActions)
  //     })
  //   });
  });
});
