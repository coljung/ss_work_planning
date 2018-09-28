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

    // find number of years for each plan type
    const selectedPlanTypes = newFilters.selectedPlanTypes.map(plan => ({
        ...plan,
        years: years.slice(0, plan.numberOfHistoricalYears),
    }));

    return _.flattenDeep(_.intersection(newFilters.selectedMetrics, metrics).map(metric =>
        years.map((year) => {
            const row = [];
            selectedPlanTypes.forEach(({ plan, years: planYear }) => {
                if (planYear.includes(year)) {
                    // preMkdwn previous and current year path
                    const preMkdwn = data.years[year].metrics[metric].plans[plan].periods['PRE-MKD'];
                    const prevPreMkdwn = data.years[year - 1].metrics[metric].plans[plan].periods['PRE-MKD'];

                    // fullSeason previous and current year path
                    const fullSeason = data.years[year].metrics[metric].plans[plan];
                    const prevFullSeason = data.years[year - 1].metrics[metric].plans[plan];

                    const preMkdwnIncr = (preMkdwn.value - prevPreMkdwn.value) / prevPreMkdwn.value;
                    const fullIncr = (fullSeason.value - prevFullSeason.value) / prevFullSeason.value;
                    const isFullIncrement = (isNaN(+fullIncr) || +fullIncr === -Infinity || +fullIncr === Infinity);
                    const isPreMrkdwnIncr = (isNaN(+preMkdwnIncr) || +preMkdwnIncr === -Infinity || +preMkdwnIncr === Infinity);
                    const isEmptyCellMetric = (metric === 'GmPercentage' || metric === 'SellThrough');
                    row.push({
                        info: {
                            metric,
                            plan,
                            year,
                            season: data.season,
                        },
                        pre_mkdwn: {
                            dataType: data.years[year].metrics[metric].plans[plan].dataType,
                            isReadOnly: !preMkdwn.canEdit,
                            key: preMkdwn.key,
                            value: preMkdwn.value || 0,
                        },
                        pre_mkdwn_incr: {
                            dataType: isEmptyCellMetric ? 'text' : incrDataType,
                            isReadOnly: !preMkdwn.canEdit,
                            value: isEmptyCellMetric ? ' ' : isPreMrkdwnIncr ? 0 : preMkdwnIncr,
                        },
                        full: {
                            dataType: fullSeason.dataType,
                            isReadOnly: !fullSeason.canEdit,
                            value: fullSeason.value || 0,
                        },
                        full_incr: {
                            dataType: isEmptyCellMetric ? 'text' : incrDataType,
                            isReadOnly: !incrCanEdit,
                            value: isEmptyCellMetric ? ' ' : isFullIncrement ? 0 : fullIncr,
                        },
                    });
                }
            });

            return row;
        })));
};


export function jsonTransformer(data, filter) {
    if (!data) {
        return {
            info: {},
            headers: [],
            data: [],
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

    const headers = [[i18n.t('headers.info'), i18n.t('headers.premkdwn'), i18n.t('headers.increment'), i18n.t('headers.fullseason'), i18n.t('headers.increment')]];

    return {
        info,
        headers,
        data: transformer(filter, data),
    };
}
