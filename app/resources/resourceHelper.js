export const getMetricName = (metric) => {
    switch (metric) {
        case 'BOM COST': return 'BOP';
        case 'RECEIVED COST': return 'RECEIPT $';
        case 'ReceiptPercentage': return 'RECEIPT %';
        case 'COGS': return 'COGS';
        case 'SALES': return 'SALES';
        case 'GmDollar': return 'GM$';
        case 'GmPercentage': return 'GM%';
        case 'TURNOVER': return 'TO';
        case 'iRETAIL': return 'iSALES';
        case 'iGmPercentage': return 'iGM%';
        default: return metric;
    }
};

export const getDataRowName = (dataRow) => {
    switch (dataRow) {
        case 'wp': return 'WORKING PLAN';
        case 'achd': return 'Actual';
        default: return dataRow;
    }
};
