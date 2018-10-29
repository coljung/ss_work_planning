export default class TopDownTransformer {
    constructor(data) {
        this.data = data;
    }

    transform(year, metric, plan) {
        const fullSeason = this.data.years[year].metrics[metric].plans[plan];
        const prevFullSeason = this.data.years[year - 1].metrics[metric].plans[plan];

        // preMkdwn previous and current year path
        const preMkdwn = fullSeason.periods['PRE-MKD'];
        const prevPreMkdwn = prevFullSeason.periods['PRE-MKD'];

        const preMkdwnIncr = ((preMkdwn.value - prevPreMkdwn.value) / prevPreMkdwn.value) * 100;
        const fullIncr = ((fullSeason.value - prevFullSeason.value) / prevFullSeason.value) * 100;
        const preMkdwnContribution = ((preMkdwn.value || 0) / (fullSeason.value || 0) || 0) * 100;
        const isFullIncrement =
            isNaN(+fullIncr) || +fullIncr === -Infinity || +fullIncr === Infinity;
        const isPreMrkdwnIncr =
            isNaN(+preMkdwnIncr) || +preMkdwnIncr === -Infinity || +preMkdwnIncr === Infinity;
        const isPreMkdwnContribution =
            isNaN(+preMkdwnContribution) ||
            +preMkdwnContribution === -Infinity ||
            +preMkdwnContribution === Infinity;
        const isEmptyCellMetric = metric === 'GmPercentage' || metric === 'SellThrough';
        const isEmptyCellPlan = plan === 'dsrp' && metric !== 'COGS';

        return {
            info: {
                metric,
                plan,
                year,
                season: this.data.season,
            },
            pre_mkdwn: {
                dataType: isEmptyCellPlan
                    ? 'text'
                    : this.data.years[year].metrics[metric].plans[plan].dataType,
                isReadOnly: !preMkdwn.canEdit,
                key: preMkdwn.key,
                value: isEmptyCellPlan ? ' ' : preMkdwn.value || 0,
            },
            pre_mkdwn_contribution: {
                dataType: isEmptyCellPlan || isEmptyCellMetric ? 'text' : 'percentage',
                isReadOnly: isEmptyCellPlan || isEmptyCellMetric ? true : !preMkdwn.canEdit,
                value:
                    isEmptyCellPlan || isEmptyCellMetric
                        ? ' '
                        : isPreMkdwnContribution
                            ? 0
                            : preMkdwnContribution.toFixed(4),
            },
            pre_mkdwn_incr: {
                dataType: isEmptyCellPlan || isEmptyCellMetric ? 'text' : 'percentage',
                isReadOnly: isEmptyCellPlan || isEmptyCellMetric ? true : !preMkdwn.canEdit,
                value:
                    isEmptyCellPlan || isEmptyCellMetric
                        ? ' '
                        : isPreMrkdwnIncr
                            ? 0
                            : preMkdwnIncr.toFixed(4),
            },
            full: {
                dataType: isEmptyCellPlan ? 'text' : fullSeason.dataType,
                isReadOnly: !fullSeason.canEdit,
                key: fullSeason.key,
                value: isEmptyCellPlan ? ' ' : fullSeason.value || 0,
            },
            full_incr: {
                dataType: isEmptyCellPlan || isEmptyCellMetric ? 'text' : 'percentage',
                isReadOnly: isEmptyCellPlan || isEmptyCellMetric ? true : !fullSeason.canEdit,
                value:
                    isEmptyCellPlan || isEmptyCellMetric
                        ? ' '
                        : isFullIncrement
                            ? 0
                            : fullIncr.toFixed(4),
            },
        };
    }
}
