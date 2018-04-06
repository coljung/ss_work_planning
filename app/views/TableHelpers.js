import moment from 'moment';

const currentYear = moment().format('YY');
const currentMonth = moment().format('MMM').toLowerCase();

const monthsRef = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12',
};

export const currencyFormat = {
    pattern: '$0,000',
    culture: 'en-US',
};

export const percentageFormat = {
    pattern: '0%',
};

export const currencyColumn = {
    type: 'numeric',
    numericFormat: currencyFormat,
    colWidths: 100,
};

export const percentageColumn = {
    type: 'numeric',
    numericFormat: percentageFormat,
    colWidths: 50,
};

export function createColumn(column, renderer) {
    switch (column.type) {
        case 'text':
            return {
                data: column.name,
                readOnly: column.isReadOnly,
                type: 'text',
            };

        case 'currency':
            return {
                ...currencyColumn,
                data: column.name,
                readOnly: column.isReadOnly,
                renderer,
            };

        case 'percentage':
            return {
                ...percentageColumn,
                data: column.name,
                readOnly: column.isReadOnly,
                renderer,
            };

        default:
            return {
                data: `${column}.value`,
                readOnly: false,
                type: 'text',
                renderer,
            };
    }
}

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

export const percentageRow = (rows, instance, row, col) => {
    const metricName = instance.getDataAtCell(row, 0);
    if (rows.indexOf(metricName) !== -1) {
        instance.setCellMeta(row, col, 'numericFormat', percentageFormat);
    }
};

export const disableRowCell = (rows, instance, row, col) => {
    const metricName = instance.getDataAtCell(row, 0);
    if (rows.indexOf(metricName) !== -1) {
        instance.setCellMeta(row, col, 'readOnly', true);
    }
};

export const numberRow = (rows, instance, row, col) => {
    const metricName = instance.getDataAtCell(row, 0);
    if (rows.indexOf(metricName) !== -1) {
        instance.setCellMeta(row, col, 'numericFormat', { pattern: '0' });
    }
};

export const disableEdit = (instance, row, col) => {
    instance.setCellMeta(row, col, 'readOnly', true);
};

export const enableEdit = (instance, row, col) => {
    instance.setCellMeta(row, col, 'readOnly', false);
};

const getCurrentCellCode = (month, year) => year + monthsRef[month];
const getCurrentDateCode = () => currentYear + monthsRef[currentMonth];

const propCode = (prop) => {
    const month = prop.substring(0, 3);
    const year = parseInt(prop.substring(3), 10);
    return { month, year };
};

export const enableCellValidDate = (prop, currentRowSeasonYear) => {
    let currentRowYear = parseInt(currentRowSeasonYear.substr(-2), 10);
    const newPropCode = propCode(prop);

    if (newPropCode.year > 1) {
        currentRowYear += 1;
    } else if (newPropCode.year < 1) {
        currentRowYear -= 1;
    }

    const cellCode = getCurrentCellCode(newPropCode.month, currentRowYear);
    const viewCode = getCurrentDateCode();

    return { cellCode, viewCode };
};

export const customBorders = (startRow = 0, rowSpan, totalRows, totalCols) => {
    const customBorderArr = [];

    for (let i = startRow; i < totalRows; ++i) {
        if (i % rowSpan === 0) {
            customBorderArr.push({
                range: {
                    from: {
                        row: i,
                        col: 0,
                    },
                    to: {
                        row: i,
                        col: totalCols - 1,
                    },
                },
                top: {
                    width: 1,
                    color: '#222',
                },
            });
        }
    }

    return customBorderArr;
};

export const mergeMetrics = (startRow, rowSpan, totalRows, totalCols, hasGap = false) => {
    const mergeArr = [];

    // span between metrics
    const metricSpan = hasGap ? rowSpan + 1 : rowSpan;

    for (let i = startRow; i < totalRows; ++i) {
        if (i % metricSpan === 0) {
            mergeArr.push({
                row: i + startRow,
                col: 0,
                rowspan: rowSpan,
                colspan: 1,
            });

            if (hasGap) {
                mergeArr.push({
                    row: i - 1,
                    col: 0,
                    rowspan: 1,
                    colspan: totalCols,
                });
            }
        }
    }

    return mergeArr;
};

// showing N/A instead of error
export const emptyCell = (instance, td, row, col) => {
    td.innerHTML = 'N/A';
    td.className += ' cellNA';

    disableEdit(instance, row, col);

    return td;
};
