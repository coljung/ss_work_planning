import Handsontable from 'handsontable';
import { borderBottom, percentageFormat, currencyFormat, emptyCell } from '../../TableHelpers';

export function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
        td.style.background = '#eee';
    }

    // styling border for each metric
    const rowSpan = 5;
    borderBottom(row, rowSpan, td, col);

    // styling border left per section
    // borderLeft(this.state.columnData.leftBorderColumns, prop, td);

    const split = prop.split('.');
    const metricInformation = this.state.data[row][split[0]];

    if (metricInformation && metricInformation.isReadOnly !== undefined) {
        instance.setCellMeta(row, col, 'readOnly', metricInformation.isReadOnly);
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

    // percentageRow(this.state.columnData.percentageRows, instance, row, col);
    // numberRow(this.state.columnData.numberRows, instance, row, col);

    return td;
}
