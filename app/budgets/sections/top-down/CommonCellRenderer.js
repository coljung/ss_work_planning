import Handsontable from 'handsontable-pro';
import { TAB_TOTAL } from './TopDownSection';
import {
    borderBottom,
    currencyFormat,
    disableEdit,
    emptyCell,
    enableCellValidDate,
    enableEdit,
    gridColors,
    leftHandColors,
    numericFormat,
    percentageFormat,
 } from '../../components/TableHelpers';

const leftHandColumns = [
    'pre_mrkdn',
    'pre_mrkdn_incr',
    'full',
    'full_incr',
];

export default function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    // styling border for each metric
    const rowSpan = this.state.info.row_span;
    // console.log(this.props.location.query);
    borderBottom(row, rowSpan, td);

    const propertyPath = prop;
    const colName = propertyPath.split('.');
    const metricInformation = this.state.data[row][colName[0]];

    if (metricInformation) {
        if (metricInformation.isReadOnly !== undefined) {
            instance.setCellMeta(row, col, 'readOnly', metricInformation.isReadOnly);
        }

        if (metricInformation.dataRow === 'tdwp' || metricInformation.dataRow === 'achd') {
            // get this from json TODO
            const budgetYear = (this.state.info.year).slice(2, 4);
            const currentRowValue = this.state.data[row].metric.value;
            const currentRowSeason = currentRowValue.split('- ')[1].slice(2, 4);
            if (budgetYear === currentRowSeason) {
                gridColors(metricInformation.dataRow, td);
            }
        }
    }

    // leftHandColors(colName[0], leftHandColumns, td);

    if (this.props.view === TAB_TOTAL) {
        disableEdit(instance, row, col);
        /*
    } else if (col > 7) {
        const currentRowSeasonYear = instance.getDataAtCell(row, 1);
        const compareCodes = enableCellValidDate(prop, currentRowSeasonYear);

        // if code combination of this cell's year + month greater than the actual month / year, then enable field
        if (compareCodes.cellCode >= compareCodes.viewCode && this.props.view !== TAB_TOTAL) {
            enableEdit(instance, row, col);
        }

        // similar logic to 'future', but here we check the next column instead of the previous
        if (((this.state.season === 'FW' && prop === 'feb1') || (this.state.season === 'SS' && prop === 'aug0')) && this.props.view !== TAB_TOTAL) {
            enableEdit(instance, row, col - 1);
        }
        */
    }

    if (colName[0] === 'previous') {
        td.className += ' leftCellBorder';
    }

    if (metricInformation && metricInformation.dataType !== undefined) {
        if ((metricInformation.dataType === 'currency'
                || metricInformation.dataType === 'percentage'
                || metricInformation.dataType === 'number')
            && isNaN(parseInt(value, 10))) {
            return emptyCell(instance, td, row, col);
        }

        switch (metricInformation.dataType) {
            case 'currency': {
                instance.setCellMeta(row, col, 'numericFormat', currencyFormat(this.state.decimals));
                // eslint-disable-next-line prefer-rest-params
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;
            }
            case 'percentage':
                instance.setCellMeta(row, col, 'numericFormat', percentageFormat);
                // eslint-disable-next-line prefer-rest-params
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;

            case 'number':
                instance.setCellMeta(row, col, 'numericFormat', numericFormat);
                // eslint-disable-next-line prefer-rest-params
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;

            case 'text':
            default:
                instance.setCellMeta(row, col, 'numericFormat', null);
                // eslint-disable-next-line prefer-rest-params
                Handsontable.renderers.TextRenderer.apply(this, arguments);
                break;
        }
    } else {
        return emptyCell(instance, td, row, col);
    }

    // disableRowCell(this.state.columnData.disabledRows || [], instance, row, col);
    // percentageRow(this.state.columnData.percentageRows || [], instance, row, col);
    // numberRow(this.state.columnData.numberRows || [], instance, row, col);

    return td;
}
