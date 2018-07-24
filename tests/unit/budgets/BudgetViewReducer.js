import reducer from '../../../app/budgets/BudgetViewReducer';
import * as actions from '../../../app/budgets/BudgetViewActions';
import * as notifications from 'notifications/NotificationActions';

describe('BudgetViewReducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            config: {},
            filters: [],
            isBudgetLoading: false,
            isDataSpreading: false,
            isRefreshRequired: false,
            view: null,
            viewData: [],
        };
    });

    it('should return the initial state on RESET_BUDGETS_DATA', () => {
        expect(reducer(undefined, {})).toEqual(initialState);

        expect(
            reducer(undefined, {
                type: actions.RESET_BUDGETS_DATA,
            })
        ).toEqual(initialState);
    });

    it('should handle RECEIVE_BUDGETS_CONFIG_DATA', () => {
        const state = {
            config: null,
        };

        expect(
            reducer(state, {
                type: actions.RECEIVE_BUDGETS_CONFIG_DATA,
                config: { available_metrics: 'SALES' }
            })
        ).toEqual({
            config: { available_metrics: 'SALES' },
        });
    });

    it('should handle REQUEST_BUDGETS_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_BUDGETS_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: true,
        }));
    });

    it('should handle RECEIVE_BUDGETS_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_BUDGETS_DATA,
                view: 'men',
                viewData: 'test',
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: false,
            view: 'men',
            viewData: { men: 'test' },
        }));
    });

    it('should handle REQUEST_SPREAD_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.REQUEST_SPREAD_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isDataSpreading: true,
        }));
    });

    it('should handle RECEIVE_SPREAD_DATA', () => {
        expect(
            reducer(undefined, {
                type: actions.RECEIVE_SPREAD_DATA,
            })
        ).toEqual(Object.assign({}, initialState, {
            isBudgetLoading: true,
            isDataSpreading: false,
            isRefreshRequired: true,
        }));
    });

    it('should handle SET_FILTER_SETUP', () => {
        expect(
            reducer(undefined, {
                type: actions.SET_FILTER_SETUP,
                filters: ['Cogs'],
            })
        ).toEqual(Object.assign({}, initialState, {
            filters: ['Cogs'],
        }));
    });

    it('should handle SET_TRIGGER_CHANGE', () => {
        expect(
            reducer(undefined, {
                type: actions.SET_TRIGGER_CHANGE,
            })
        ).toEqual(Object.assign({}, initialState, {
            isRefreshRequired: true,
        }));
    });
});
