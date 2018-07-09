export const getMetricName = (metric) => {
    switch (metric) {
        case 'BOM COST': return 'BOP';
        case 'RECEIVED COST': return 'RECEIPT $';
        case 'RECEIPT %': return 'RECEIPT %';
        case 'COGS': return 'COGS';
        case 'SALES': return 'SALES';
        case 'GM$': return 'GM$';
        case 'GM%': return 'GM%';
        case 'TURNOVER': return 'TO';
        case 'iRETAIL': return 'iSALES';
        case 'iGM%': return 'iGM%';
        default: return metric;
    }
};

export const getDataRowName = (dataRow) => {
    switch (dataRow) {
        case 'tdwp': return 'TDWP';
        case 'achd': return 'Actual';
        default: return dataRow;
    }
};
