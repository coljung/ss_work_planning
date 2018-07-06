import Handsontable from 'handsontable-pro';
import {
    enableCellValidDate,
    disableEdit,
    enableEdit,
    emptyCell,
    percentageFormat,
    numericFormat,
    borderBottom,
    gridColors,
    currencyFormat } from '../../components/TableHelpers';

export default function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    // styling border for each metric
    const rowSpan = this.state.info.row_span;
    borderBottom(row, rowSpan, td, col);

    const propertyPath = prop;
    const split = propertyPath.split('.');
    const metricInformation = this.state.data[row][split[0]];

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

    if (metricInformation && metricInformation.dataType !== undefined) {
        if ((metricInformation.dataType === 'currency'
                || metricInformation.dataType === 'percentage'
                || metricInformation.dataType === 'number')
            && isNaN(parseInt(value, 10))) {
            return emptyCell(instance, td, row, col);
        }

        switch (metricInformation.dataType) {
            case 'currency':
                instance.setCellMeta(row, col, 'numericFormat', currencyFormat);
                // eslint-disable-next-line prefer-rest-params
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;

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
