/* istanbul ignore next */
export const leftBorderColumns = [
    'total_stdpremarkdown',
    'women_stdpremarkdown',
    'men_stdpremarkdown',
];

/* istanbul ignore next */
export const percentageRows = [
    'GM%',
    'iGM%',
    'RECEIPT%',
];

/* istanbul ignore next */
export const numberRows = [
    'TURNOVER RATE',
];

// TODO This would come from the api
/* istanbul ignore next */
export const columns = [
    {
        grouping: 'Metrics',
        label: 'Name',
        name: 'metric',
        type: 'text',
        isReadOnly: true,
    },
    {
        grouping: 'Metrics',
        label: 'Season',
        name: 'seasonyear',
        type: 'text',
        isReadOnly: true,
    },
    {
        grouping: 'Total',
        label: 'C-STD Pre Mkd',
        name: 'total_stdpremarkdown',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Total',
        label: 'D-Incr %',
        name: 'total_incr_stdpremarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Total',
        label: 'E-STD Post Mkd',
        name: 'total_stdpostmarkdown',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Total',
        label: 'F-Incr %',
        name: 'total_incr_stdpostmarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Total',
        label: 'G-Full Season',
        name: 'total_full',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Total',
        label: 'H-Incr %',
        name: 'total_full_incr',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Women',
        label: 'I-STD Pre Mkd',
        name: 'women_stdpremarkdown',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Women',
        label: 'J-Incr %',
        name: 'women_incr_stdpremarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Women',
        label: 'K-STD Post Mkd',
        name: 'women_stdpostmarkdown',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Women',
        label: 'L-Incr %',
        name: 'women_incr_stdpostmarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Women',
        label: 'M-Full Season',
        name: 'women_full',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Women',
        label: 'N-Incr %',
        name: 'women_full_incr',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Women',
        label: 'O-Cont %',
        name: 'women_full_cont',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Men',
        label: 'P-STD Pre Mkd',
        name: 'men_stdpremarkdown',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Men',
        label: 'Q-Incr %',
        name: 'men_incr_stdpremarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Men',
        label: 'R-STD Post Mkd',
        name: 'men_stdpostmarkdown',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Men',
        label: 'S-Incr %',
        name: 'men_incr_stdpostmarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Men',
        label: 'T-Full Season',
        name: 'men_full',
        type: 'currency',
        isReadOnly: false,
    },
    {
        grouping: 'Men',
        label: 'U-Incr %',
        name: 'men_full_incr',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        grouping: 'Men',
        label: 'V-Cont %',
        name: 'men_full_cont',
        type: 'percentage',
        isReadOnly: true,
    },
];
