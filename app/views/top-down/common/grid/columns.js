import moment from 'moment';
import Handsontable from 'handsontable';

const currentYear = moment().format('YY');
const currentMonth = moment().format('MMM').toLowerCase();

const splitValue = (value, index) => `${value.substring(0, index)},${value.substring(index)}`;

let currentRow = '';

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

const disabledMetrics = ['GM$'];
let metricName = '';

const getCurrentCellCode = (month, year) => year + monthsRef[month];

const columns = (season, rowSpan) => {

    const leftBorderCols = [
        'stdpremarkdown',
        'previous',
    ];

    function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
        // console.log(instance);
        cellProperties = {};
        Handsontable.renderers.NumericRenderer.apply(this, arguments);

        // styling border per section
        if (leftBorderCols.indexOf(prop) !== -1) {
            td.className += ' leftCellBorder';
        }

        // styling border for each metric
        if ((row + 1) % rowSpan === 0) {
            td.className += ' bottomCellBorder';
        }

        // manage error and display N/A instead
        if (isNaN(value)) {
            cellProperties.type = 'text';
            td.innerHTML = 'N/A';
            td.className += ' cellNA';
            return td;
        }

        if (currentRow !== row) {
            currentRow = row;
            // do this check once per row
            metricName = instance.getDataAtCell(row, 0);
        }

        if (disabledMetrics.indexOf(metricName) !== -1) {
            instance.setCellMeta(row, col, 'readOnly', true);
            return td;
        }

        // no customizations for previous
        if (prop === 'previous') {
            return td;
        }

        if (prop === 'future') {
            // for now future is always enabled
            // checks if prev column is editable, then this one becomes editable too
            // if (!instance.getCellMeta(row, col - 1).readOnly) {
            //     instance.setCellMeta(row, col, 'readOnly', false);
            // }
            instance.setCellMeta(row, col, 'readOnly', false);
            return td;
        }

        const newPropMonth = prop.substring(0, 3);
        const newPropYearCode = prop.substring(3);

        const currentRowSeasonYear = instance.getDataAtCell(row, 1);
        let currentRowYear = parseInt(currentRowSeasonYear.substr(-2), 10);

        if (newPropYearCode > 1) {
            currentRowYear += 1;
        } else if (newPropYearCode < 1) {
            currentRowYear -= 1;
        }
        const cellCode = getCurrentCellCode(newPropMonth, currentRowYear);
        const viewCode = currentYear + monthsRef[currentMonth];

        // if code combination of this cell's year + month greater than the actual month / year, then enable field
        if (parseInt(cellCode, 10) >= parseInt(viewCode, 10)) {
            instance.setCellMeta(row, col, 'readOnly', false);
        }

        // similar logic to 'future', but here we check the next column instead of the previous
        if ((season === 'FW' && prop === 'feb1') || (season === 'SS' && prop === 'aug0')) {
            if (!instance.getCellMeta(row, col).readOnly) {
                instance.setCellMeta(row, col - 1, 'readOnly', false);
            }
        }

        return td;
    }

    function cellValueRenderSums(instance, td, row, col, prop, value, cellProperties) {
        cellProperties = {};
        Handsontable.renderers.NumericRenderer.apply(this, arguments);

        // if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
        //     td.style.background = '#eee';
        // }

        if ((row + 1) % rowSpan === 0) {
            td.className += ' bottomCellBorder';
        }
        if (isNaN(value)) {
            cellProperties.type = 'text';
            td.innerHTML = 'N/A';
            td.className += ' cellNA';
            return td;
        }
        return td;
    }

    const commonColums = [
        {
            data: 'metric',
            type: 'text',
            readOnly: true,
        },
        {
            data: 'seasonyear',
            type: 'text',
            readOnly: true,
        },
        {
            data: 'stdpremarkdown',
            renderer: cellValueRenderSums,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'incr_stdpremarkdown',
            renderer: cellValueRenderSums,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'stdpostmarkdown',
            renderer: cellValueRenderSums,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'incr_stdpostmarkdown',
            renderer: cellValueRenderSums,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'full',
            renderer: cellValueRenderSums,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'full_incr',
            renderer: cellValueRenderSums,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'previous',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
    ];

    const SS = [
        {
            data: 'aug0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'sep0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'oct0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'nov0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'dec0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jan1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'feb1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'mar1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'apr1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'may1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jun1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jul1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'aug1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'sep1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'oct1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'nov1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'dec1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jan2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'future',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
    ];

    const FW = [
        {
            data: 'feb1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'mar1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'apr1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'may1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jun1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jul1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'aug1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'sep1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'oct1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'nov1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'dec1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jan2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'feb2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'mar2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'apr2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'may2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jun2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jul2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'future',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: false,
            colWidths: 100,
        },
    ];

    const SSData = commonColums.concat(SS);
    const FWData = commonColums.concat(FW);

    const columnData = [SSData, FWData];
    return columnData;
};

export default columns;
