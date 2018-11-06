import i18n from 'i18next';
import _ from 'lodash/fp';
import Transformer from '../transformer/Transformer';

export const currencyFormat = (decimals = false) => ({
    pattern: {
        output: 'currency',
        mantissa: decimals ? 2 : 0,
        thousandSeparated: true,
    },
    culture: 'en-US',
});

export const percentageFormat = {
    pattern: {
        output: 'percent',
        mantissa: 1,
        spaceSeparated: true,
    },
};

export const numericFormat = {
    pattern: {
        output: 'number',
        mantissa: 0,
        spaceSeparated: true,
    },
};

export const borderLeft = (columns, prop, td) => {
    if (columns.indexOf(prop) !== -1) {
        td.className += ' leftCellBorder';
    }
};

export const borderBottom = (row, rowSpan, td) => {
    if ((row + 1) % rowSpan === 0) {
        td.className += ' bottomCellBorder';
    }
};

export const disableEdit = (instance, row, col) => {
    instance.setCellMeta(row, col, 'readOnly', true);
};

export const enableEdit = (instance, row, col) => {
    instance.setCellMeta(row, col, 'readOnly', false);
};

// showing N/A instead of error
export const emptyCell = (instance, td, row, col) => {
    td.innerHTML = i18n.t('notAvailable');
    td.className += ' cellNA';

    disableEdit(instance, row, col);

    return td;
};

export const cleanNumericInput = value => +String(value).replace(/[^\d.-]/g, '');

const transformer = (newFilters, data, config) => {
    if (!data.years) {
        return {};
    }

    const years = Object.keys(data.years).sort().slice(1).reverse();

    // find number of years for each plan type
    const selectedPlanTypes = newFilters.selectedPlanTypes.map(plan => ({
        ...plan,
        years: years.slice(0, plan.numberOfHistoricalYears),
    }));

    const viewType = 'topDown';
    const factory = new Transformer(viewType, data);

    return _.flattenDeep(_.intersection(newFilters.selectedMetrics, config.availableMetrics).map(metric =>
        years.map((year) => {
            const row = [];
            selectedPlanTypes.forEach(({ plan, years: planYear }) => {
                if (planYear.includes(year)) {
                    row.push(factory.transform(year, metric, plan));
                }
            });

            return row;
        })));
};

/**
 *
 * @param {object} data Data object viewData from budget/duck/reducers.js
 * @param {object} filter
 * @param {object} config
 */
export function jsonTransformer(data, filter, config) {
    if (!data) {
        return {
            data: [],
            headers: [],
            info: {
                season: '',
                year: '',
                metrics: 0,
                total: 0,
            },
        };
    }

    const yearsArray = [];
    for (let i = 0; i < filter.selectedPlanTypes.length; i++) {
        yearsArray.push(filter.selectedPlanTypes[i].numberOfHistoricalYears);
    }
    const numberOfYears = yearsArray.reduce((accumulator, currentValue) =>
        accumulator + currentValue, 0);
    const numberOfMetrics = filter.selectedMetrics.length;

    const info = {
        season: data.season,
        year: data.budgetYear,
        metrics: numberOfMetrics,
        total: numberOfMetrics * numberOfYears,
    };

    const headers = [
        i18n.t('headers.premkdwn'),
        i18n.t('headers.premkdwncontribution'),
        i18n.t('headers.increment'),
        i18n.t('headers.fullseason'),
        i18n.t('headers.increment')];

    return {
        info,
        headers,
        data: transformer(filter, data, config),
    };
}
