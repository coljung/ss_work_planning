import Handsontable from 'handsontable';
import { TAB_TOTAL } from './TopDownSection';
import {
    borderBottom,
    currencyFormat,
    disableEdit,
    emptyCell,
    gridColors,
    numericFormat,
    percentageFormat,
 } from '../../components/TableHelpers';

export default function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    // styling border for each metric
    const rowSpan = this.state.info.row_span;
    borderBottom(row, rowSpan, td);

    const colName = prop.split('.');
    const metricInformation = this.state.data[row][colName[0]];

    if (metricInformation) {
        if (metricInformation.isReadOnly !== undefined) {
            instance.setCellMeta(row, col, 'readOnly', metricInformation.isReadOnly);
        }

        const rowInformation = this.state.data[row].info;
        const rowYear = rowInformation.year.toString().slice(2, 4);
        const budgetYear = this.state.info.year.slice(2, 4);
        if (budgetYear === rowYear) {
            gridColors(rowInformation.plan, td);
        }
    }

    if (this.props.view === TAB_TOTAL) {
        disableEdit(instance, row, col);
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

    return td;
}
