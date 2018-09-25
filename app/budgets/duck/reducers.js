import _ from 'lodash/fp';
import types from './types';
import { LOGOUT_SUCCESS } from '../../user/duck/types';

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

const transformer = (newFilters, data) => {
    const years = Object.keys(data.years).sort().slice(1).reverse();
    const metrics = Object.keys(data.years[years[0]].metrics);
    const incrDataType = 'percentage';
    const incrCanEdit = false;

    // find year for each pans
    newFilters.plans = newFilters.plans.map(plan => ({
        ...plan,
        years: years.slice(0, plan.numberOfHistoricalYears),
    }));

    return _.flattenDeep(_.intersection(newFilters.metrics, metrics).map(metric =>
        years.map((year) => {
            const row = [];
            newFilters.plans.forEach(({ plan, years: planYear }) => {
                if (planYear.includes(year)) {
                    const preMkdwnIncr = ((data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].value - data.years[year - 1].metrics[metric].plans[plan].periods['PRE-MKD'].value) / data.years[year - 1].metrics[metric].plans[plan].periods['PRE-MKD'].value);
                    const fullIncr = ((data.years[year].metrics[metric].plans[plan].value - data.years[year - 1].metrics[metric].plans[plan].value) / data.years[year - 1].metrics[metric].plans[plan].value);
                    const isFullIncrement = (isNaN(+fullIncr) || +fullIncr === -Infinity || +fullIncr === Infinity);
                    const isPreMrkdwnIncr = (isNaN(+preMkdwnIncr) || +preMkdwnIncr === -Infinity || +preMkdwnIncr === Infinity);
                    row.push({
                        info: {
                            metric,
                            plan,
                            year,
                            season: data.season,
                        },
                        pre_mkdwn: {
                            dataType: data.years[year].metrics[metric].plans[plan].dataType,
                            isReadOnly: !data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].canEdit,
                            value: data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].value || 0,
                        },
                        pre_mkdwn_incr: {
                            dataType: incrDataType,
                            isReadOnly: !incrCanEdit,
                            value: isPreMrkdwnIncr ? 0 : preMkdwnIncr,
                        },
                        full: {
                            dataType: data.years[year].metrics[metric].plans[plan].dataType,
                            isReadOnly: !data.years[year].metrics[metric].plans[plan].canEdit,
                            value: data.years[year].metrics[metric].plans[plan].value || 0,
                        },
                        full_incr: {
                            dataType: incrDataType,
                            isReadOnly: !incrCanEdit,
                            value: isFullIncrement ? 0 : fullIncr,
                        },
                    });
                }
            });

            return row;
        })));
};


function jsonTransformer(data, filter) {
    const yearsArray = [];
    for (let i = 0; i < filter.plans.length; i++) {
        yearsArray.push(filter.plans[i].numberOfHistoricalYears);
    }
    const numberOfYears = yearsArray.reduce((accumulator, currentValue) => accumulator + currentValue);
    const numberOfMetrics = filter.metrics.length;

    const info = {
        season: data.season,
        year: data.budgetYear,
        metrics: numberOfMetrics,
        start_row: 0,
        has_gaps: false,
        total: numberOfMetrics * numberOfYears,
    };


    const headers = [['Info', 'Pre-Mkdn', 'Incr%', 'Full Season', 'Incr%']];

    const response = {
        info,
        headers,
        data: transformer(filter, data),
    };
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
