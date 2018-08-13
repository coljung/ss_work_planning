import actions from '../../../../app/home/duck/actions';
import types from '../../../../app/home/duck/types';

describe('Home action creators', () => {
    it('Should test requestBudgets', () => {
        const expectedAction = {
            type: types.REQUEST_BUDGETS
        };

        expect(actions.requestBudgets()).toEqual(expectedAction);
    });

    it('Should test receiveBudgets', () => {
        const budgets = {
            foo: 'Bar'
        };
        const expectedAction = {
            type: types.RECEIVE_BUDGETS,
            budgets
        };
        expect(actions.receiveBudgets(budgets)).toEqual(expectedAction);
    });

    it('Should test requestSeasons', () => {
        const expectedAction = {
            type: types.REQUEST_SEASONS
        };
        expect(actions.requestSeasons()).toEqual(expectedAction);
    });

    it('Should test receiveSeasons', () => {
        const seasons = {
            foo: 'Bar'
        };
        const expectedAction = {
            type: types.RECEIVE_SEASONS,
            seasons
        };
        expect(actions.receiveSeasons(seasons)).toEqual(expectedAction);
    });

    it('Should test requestBudgetCreate', () => {
        const budget = {
            foo: 'Bar'
        };
        const expectedAction = {
            type: types.REQUEST_CREATE_BUDGET,
            budget
        };
        expect(actions.requestBudgetCreate(budget)).toEqual(expectedAction);
    });

    it('Should test receiveBudgetCreate', () => {
        const budget = {
            foo: 'Bar'
        };
        const expectedAction = {
            type: types.RECEIVE_CREATE_BUDGET,
            budget
        };
        expect(actions.receiveBudgetCreate(budget)).toEqual(expectedAction);
    });
});
