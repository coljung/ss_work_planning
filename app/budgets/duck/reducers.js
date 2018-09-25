import types from './types';
import { LOGOUT_SUCCESS } from '../../user/duck/types';
import newResponse from '../../../tests/fixtures/newResponse.json';

const initialState = {
    config: {},
    filters: {
        availableMetrics: [],
        availablePlans: [],
    },
    isBudgetLoading: false,
    isDataSpreading: false,
    isRefreshRequired: false,
    view: null,
    viewData: {
        data: [],
        headers: [],
        info: {},
    },
};

const filters = [];


function jsonTransformer(data, filter) {
    const info = {
        season: newResponse.season,
        year: newResponse.budgetYear,
        metrics: 5,
        start_row: 0,
        has_gaps: false,
        total: 15,
    };

    console.log('Filters---------', filter);

    const headers = [['Info', 'Pre-Mkdn', 'Incr%', 'Full Season', 'Incr%']];

    const response = {
        info,
        headers,
        data: [],
    };
    const incrDataType = 'percentage';
    const incrCanEdit = false;
    const result = [];
    Object.keys(data.years).sort().slice(1)
        .forEach(year => Object.keys(data.years[year].metrics)
            .forEach(metric => Object.keys(data.years[year].metrics[metric].plans)
                .forEach((plan) => {
                    const preMkdwnIncr = ((data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].value - data.years[year - 1].metrics[metric].plans[plan].periods['PRE-MKD'].value) / data.years[year - 1].metrics[metric].plans[plan].periods['PRE-MKD'].value);
                    console.log('check PreMkdwn value-----', year - 1, plan, preMkdwnIncr);
                    const fullIncr = ((data.years[year].metrics[metric].plans[plan].value - data.years[year - 1].metrics[metric].plans[plan].value) / data.years[year - 1].metrics[metric].plans[plan].value);
                    const isFullIncrement = ((fullIncr >= 0 && !-Infinity) || (fullIncr <= 0 && !-Infinity));
                    const isPreMrkdwnIncr = ((preMkdwnIncr >= 0 && !-Infinity) || (preMkdwnIncr <= 0 && !-Infinity));
                    result.push({
                        info: {
                            metric: data.years[year].metrics[metric].metric,
                            plan: data.years[year].metrics[metric].plans[plan].plan,
                            year: data.years[year].year,
                            season: data.season,
                        },
                        pre_mkdwn: {
                            dataType: data.years[year].metrics[metric].plans[plan].dataType,
                            isReadOnly: data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].canEdit,
                            value: data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].value || 0,
                        },
                        pre_mkdwn_incr: {
                            dataType: incrDataType,
                            isReadOnly: incrCanEdit,
                            value: isPreMrkdwnIncr ? preMkdwnIncr : 0,
                        },
                        full: {
                            dataType: data.years[year].metrics[metric].plans[plan].dataType,
                            isReadOnly: data.years[year].metrics[metric].plans[plan].canEdit,
                            value: data.years[year].metrics[metric].plans[plan].value || 0,
                        },
                        full_incr: {
                            dataType: incrDataType,
                            isReadOnly: incrCanEdit,
                            value: isFullIncrement ? fullIncr : 0,
                        },
                    });
                })));

    response.data = result;
    // console.log('response-------', JSON.stringify(response, null, 2));
    return response;
}

const budgetViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return initialState;
        case types.RECEIVE_BUDGETS_CONFIG_DATA:
            return {
                ...state,
                config: action.result,
            };

        case types.REQUEST_BUDGETS_DATA:
            return {
                ...state,
                isBudgetLoading: true,
                isRefreshRequired: false,
            };

        case types.RECEIVE_BUDGETS_DATA:
            return {
                ...state,
                isBudgetLoading: false,
                view: action.view,
                viewData: jsonTransformer(action.result, action.filters),
            };

        case types.REQUEST_SPREAD_DATA:
            return {
                ...state,
                isDataSpreading: true,
            };

        case types.RECEIVE_SPREAD_DATA:
            return {
                ...state,
                isDataSpreading: false,
                isRefreshRequired: true,
            };

        case types.SET_FILTER_SETUP:
            return {
                ...state,
                filters: action.filters,
            };

        case types.RESET_BUDGETS_DATA:
            return initialState;

        default:
            return state;
    }
};

export default budgetViewReducer;
