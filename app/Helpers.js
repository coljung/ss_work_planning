export default function getApiUrl() {
    /* istanbul ignore next */
    return process.env.NODE_ENV === 'test' ? `${UI_PLANNING_HOST}/api/` : '/api/';
}

export const defaultMetricSequence = () =>
  [
      'SALES',
      'COGS',
      'GM$',
      'GM%',
      'RECEIVED COST',
      'RECEIPT%',
      'BOM COST',
      'iRETAIL',
      'iGM%',
      'TURNOVER RATE',
  ].join(',');
