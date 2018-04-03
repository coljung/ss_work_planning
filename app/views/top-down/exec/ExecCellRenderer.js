import Handsontable from 'handsontable-pro';
import { borderLeft, borderBottom, percentageRow, numberRow, disableEdit } from '../../TableHelpers';

function cellMetric(instance, td, row, col, prop, value, cellProperties) {
    td.className += ' metricCell';

    return td;
}

function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
    if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
        td.style.background = '#eee';
    }

    // styling border left per section
    borderLeft(this.state.columnData.leftBorderColumns, prop, td);

    // styling border for each metric
    const rowSpan = 5;
    borderBottom(row, rowSpan, td, col);

    // showing N/A instead of error
    if (isNaN(parseInt(value, 10))) {
        td.innerHTML = 'N/A';
        td.className += ' cellNA';

        disableEdit(instance, row, col);

        return td;
    }

    percentageRow(this.state.columnData.percentageRows, instance, row, col);
    numberRow(this.state.columnData.numberRows, instance, row, col);

    Handsontable.renderers.NumericRenderer.apply(this, arguments);

    return td;
}

export function cellRendererFactory(column) {
    if (column.name === 'metric') {
        return cellMetric.bind(this);
    }

    if (column.type === 'percentage' || column.type === 'currency') {
        return cellValueRender.bind(this);
    }

    return undefined;
}
