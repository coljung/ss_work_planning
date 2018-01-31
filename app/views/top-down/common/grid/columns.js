import Handsontable from 'handsontable';
import { borderLeft,
        borderBottom,
        GMPercentage,
        disableEdit,
        getCurrentCellCode,
        getCurrentDateCode,
        enableCellValidDate,
        totalReadOnly,
    } from '../../../Helpers';


const splitValue = (value, index) => `${value.substring(0, index)},${value.substring(index)}`;

let currentRow = '';
let metricName = '';

const leftBorderCols = [
    'seasonyear',
    'stdpremarkdown',
    'previous',
];

// const getCurrentCellCode = getCellCode(month, year) => year + monthsRef[month];

const columns = (season, rowSpan) => {

    function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
        // console.log(instance);
        cellProperties = {};
        Handsontable.renderers.NumericRenderer.apply(this, arguments);

        // read only for the whole total view
        totalReadOnly(instance, row, col, td, prop);

        // styling border left per section
        borderLeft(leftBorderCols, prop, td);

        // styling border for each metric
        borderBottom(row, rowSpan, td);

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

        // disable editing for a particular metric in the array
        const disabledMetrics = ['GM$'];
        disableEdit(instance, row, col, td, disabledMetrics);

        // formatting GM%
        GMPercentage(instance, row, col, td);

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


        // anything as of prior to future columns
        if (col > 7) {

            const currentRowSeasonYear = instance.getDataAtCell(row, 1);
            const compareCodes = enableCellValidDate(prop, currentRowSeasonYear);
            // console.log(compareCodes.viewCode);
            // if code combination of this cell's year + month greater than the actual month / year, then enable field
            if (compareCodes.cellCode >= compareCodes.viewCode) {
                instance.setCellMeta(row, col, 'readOnly', false);
            }

            // similar logic to 'future', but here we check the next column instead of the previous
            if ((season === 'FW' && prop === 'feb1') || (season === 'SS' && prop === 'aug0')) {
                if (!instance.getCellMeta(row, col).readOnly) {
                    instance.setCellMeta(row, col - 1, 'readOnly', false);
                }
            }

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
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'incr_stdpremarkdown',
            renderer: cellValueRender,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'stdpostmarkdown',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'incr_stdpostmarkdown',
            renderer: cellValueRender,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'full',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'full_incr',
            renderer: cellValueRender,
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
