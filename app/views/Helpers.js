import moment from 'moment';
import BudgetViewsContainer from '../views/BudgetViewsContainer';
// import ViewCommonContainer from '../views/top-down/common/ViewCommonContainer';

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

export const borderLeft = (columns, prop, td) => {
    if (columns.indexOf(prop) !== -1) {
        td.className += ' leftCellBorder';
    }
    return td;
};

export const borderBottom = (row, rowSpan, td) => {
    if ((row + 1) % rowSpan === 0) {
        td.className += ' bottomCellBorder';
    }
    return td;
};

export const GMPercentage = (instance, row, col, td) => {
    const metricName = instance.getDataAtCell(row, 0);

    if (metricName === 'GM%' || metricName === 'iGM%' || metricName === 'RECEIPT%') {
        instance.setCellMeta(row, col, 'format', '0%');
    }
    return td;
};

export const disableEdit = (instance, row, col, td, disabledMetrics) => {
    const metricName = instance.getDataAtCell(row, 0);

    if (disabledMetrics.indexOf(metricName) !== -1) {
        instance.setCellMeta(row, col, 'readOnly', true);
    }
    return td;
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
