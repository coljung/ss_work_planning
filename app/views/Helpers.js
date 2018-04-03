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
            return {};
    }
}

export function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });

    return map;
}

export const borderLeft = (columns, prop, td) => {
    if (columns.indexOf(prop) !== -1) {
        td.className += ' leftCellBorder';
    }
};

export const borderBottom = (row, rowSpan, td, col) => {
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
