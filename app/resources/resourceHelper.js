export const getMetricName = (metric) => {
    switch (metric) {
        case 'Bom': return 'BOP';
        case 'Receipt': return 'RECEIPT $';
        case 'ReceiptPercentage': return 'RECEIPT %';
        case 'Cogs': return 'COGS';
        case 'Sales': return 'SALES';
        case 'GmDollar': return 'GM$';
        case 'GmPercentage': return 'GM%';
        case 'Turnover': return 'TO';
        case 'iSales': return 'iSALES';
        case 'iGmPercentage': return 'iGM%';
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
