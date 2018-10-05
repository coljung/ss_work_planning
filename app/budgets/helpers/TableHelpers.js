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

const transformer = (newFilters, data, config) => {
    if (!data.years) {
        return {};
    }

    const years = Object.keys(data.years).sort().slice(1).reverse();
    const incrDataType = 'percentage';

    // find number of years for each plan type
    const selectedPlanTypes = newFilters.selectedPlanTypes.map(plan => ({
        ...plan,
        years: years.slice(0, plan.numberOfHistoricalYears),
    }));
    return _.flattenDeep(_.intersection(newFilters.selectedMetrics, config.availableMetrics).map(metric =>
        years.map((year) => {
            const row = [];
            selectedPlanTypes.forEach(({ plan, years: planYear }) => {
                if (planYear.includes(year)) {
                    const fullSeason = data.years[year].metrics[metric].plans[plan];
                    const prevFullSeason = data.years[year - 1].metrics[metric].plans[plan];

                    // preMkdwn previous and current year path
                    const preMkdwn = fullSeason.periods['PRE-MKD'];
                    const prevPreMkdwn = prevFullSeason.periods['PRE-MKD'];

                    const preMkdwnIncr = (preMkdwn.value - prevPreMkdwn.value) / prevPreMkdwn.value;
                    const fullIncr = (fullSeason.value - prevFullSeason.value) / prevFullSeason.value;
                    const preMkdwnContribution = (preMkdwn.value || 0) / (fullSeason.value || 0) || 0;
                    const isFullIncrement = (isNaN(+fullIncr) || +fullIncr === -Infinity || +fullIncr === Infinity);
                    const isPreMrkdwnIncr = (isNaN(+preMkdwnIncr) || +preMkdwnIncr === -Infinity || +preMkdwnIncr === Infinity);
                    const isPreMkdwnContribution = (isNaN(+preMkdwnContribution) || +preMkdwnContribution === -Infinity || +preMkdwnContribution === Infinity);
                    const isEmptyCellMetric = (metric === 'GmPercentage' || metric === 'SellThrough');
                    const isEmptyCellPlan = ((plan === 'dsrp' && metric !== 'COGS' && metric !== 'SALES' && metric !== 'GmDollar'));
                    row.push({
                        info: {
                            metric,
                            plan,
                            year,
                            season: data.season,
                        },
                        pre_mkdwn: {
                            dataType: isEmptyCellPlan ? 'text' : data.years[year].metrics[metric].plans[plan].dataType,
                            isReadOnly: !preMkdwn.canEdit,
                            key: preMkdwn.key,
                            value: isEmptyCellPlan ? ' ' : preMkdwn.value || 0,
                        },
                        pre_mkdwn_contribution: {
                            dataType: isEmptyCellPlan || isEmptyCellMetric ? 'text' : incrDataType,
                            isReadOnly: true, // @TODO should be !preMkdwn.canEdit for the edit story
                            value: isEmptyCellPlan || isEmptyCellMetric ? ' ' : isPreMkdwnContribution ? 0 : preMkdwnContribution.toFixed(4),
                        },
                        pre_mkdwn_incr: {
                            dataType: isEmptyCellPlan || isEmptyCellMetric ? 'text' : incrDataType,
                            isReadOnly: !preMkdwn.canEdit,
                            value: isEmptyCellPlan || isEmptyCellMetric ? ' ' : isPreMrkdwnIncr ? 0 : preMkdwnIncr.toFixed(4),
                        },
                        full: {
                            dataType: isEmptyCellPlan ? 'text' : fullSeason.dataType,
                            isReadOnly: !fullSeason.canEdit,
                            key: fullSeason.key,
                            value: isEmptyCellPlan ? ' ' : fullSeason.value || 0,
                        },
                        full_incr: {
                            dataType: isEmptyCellPlan || isEmptyCellMetric ? 'text' : incrDataType,
                            isReadOnly: !fullSeason.canEdit,
                            value: isEmptyCellPlan || isEmptyCellMetric ? ' ' : isFullIncrement ? 0 : fullIncr.toFixed(4),
                        },
                    });
                }
            });

            return row;
        })));
};


export function jsonTransformer(data, filter, config) {
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

    const headers = [[
        i18n.t('headers.info'),
        i18n.t('headers.premkdwn'),
        i18n.t('headers.premkdwncontribution'),
        i18n.t('headers.increment'),
        i18n.t('headers.fullseason'),
        i18n.t('headers.increment')]];

    return {
        info,
        headers,
        data: transformer(filter, data, config),
    };
}
