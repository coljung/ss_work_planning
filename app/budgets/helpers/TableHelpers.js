import i18n from 'i18next';
import _ from 'lodash/fp';

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
        mantissa: 2,
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

const transformer = (newFilters, data) => {
    if (!data.years) {
        return {};
    }

    const years = Object.keys(data.years).sort().slice(1).reverse();
    const metrics = Object.keys(data.years[years[0]].metrics);
    const incrDataType = 'percentage';
    const incrCanEdit = false;

    // find year for each pans
    newFilters.selectedPlanTypes = newFilters.selectedPlanTypes.map(plan => ({
        ...plan,
        years: years.slice(0, plan.numberOfHistoricalYears),
    }));

    return _.flattenDeep(_.intersection(newFilters.selectedMetrics, metrics).map(metric =>
        years.map((year) => {
            const row = [];
            newFilters.selectedPlanTypes.forEach(({ plan, years: planYear }) => {
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
                            key: data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].key,
                            value: data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].value || 0,
                        },
                        pre_mkdwn_incr: {
                            dataType: incrDataType,
                            isReadOnly: !data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'].canEdit,
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


export function jsonTransformer({ data }, filter) {
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
