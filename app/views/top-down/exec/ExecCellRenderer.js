import Handsontable from 'handsontable';
import { borderBottom, disableEdit, percentageFormat, currencyFormat } from '../../TableHelpers';

// showing N/A instead of error
function emptyCell(instance, td, row, col) {
    td.innerHTML = 'N/A';
    td.className += ' cellNA';

    disableEdit(instance, row, col);

    return td;
}

export function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
        td.style.background = '#eee';
    }

    // styling border for each metric
    const rowSpan = 5;
    borderBottom(row, rowSpan, td, col);

    const propertyPath = prop;
    const split = propertyPath.split('.');
    const metricInformation = this.state.data[row][split[0]];

    if (metricInformation && metricInformation.readOnly !== undefined) {
        instance.setCellMeta(row, col, 'readOnly', metricInformation.readOnly);
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
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;

            case 'percentage':
                instance.setCellMeta(row, col, 'numericFormat', percentageFormat);
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;

            case 'text':
            default:
                instance.setCellMeta(row, col, 'numericFormat', null);
                Handsontable.renderers.TextRenderer.apply(this, arguments);
                break;
        }
    } else {
        return emptyCell(instance, td, row, col);
    }

    // styling border left per section
    // borderLeft(this.state.columnData.leftBorderColumns, prop, td);

    // percentageRow(this.state.columnData.percentageRows, instance, row, col);
    // numberRow(this.state.columnData.numberRows, instance, row, col);

    return td;
}

export function cellRendererFactory() {
    return cellValueRenderer.bind(this);
}
