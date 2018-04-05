import Handsontable from 'handsontable';
import { borderLeft, borderBottom, percentageRow, numberRow, disableEdit } from '../../TableHelpers';

function cellMetric(instance, td, row, col, prop, value, cellProperties) {
    td.className += ' metricCell';

    return td;
}

function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
    if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
        td.style.background = '#eee';
    }

    const propertyPath = prop;
    const split = propertyPath.split('.');
    const metricInformation = this.state.data[row][split[0]];

    if (metricInformation && metricInformation.readOnly !== undefined) {
        instance.setCellMeta(row, col, 'readOnly', metricInformation.readOnly);
    }

    // styling border left per section
    // borderLeft(this.state.columnData.leftBorderColumns, prop, td);

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

    // percentageRow(this.state.columnData.percentageRows, instance, row, col);
    // numberRow(this.state.columnData.numberRows, instance, row, col);

    Handsontable.renderers.NumericRenderer.apply(this, arguments);

    return td;
}

function cellRenderer(instance, td, row, col, prop, value, cellProperties) {
    const data = instance.getDataAtCell(row, col);

    if (typeof data === 'number') {
        return cellValueRender(this, instance, td, row, col, prop, value, cellProperties);
    } else if (typeof data === 'string') {
        return cellMetric(instance, td, row, col, prop, value, cellProperties);
    }

    return undefined;
}

export function cellRendererFactory(column) {
    return cellValueRender.bind(this);

    if (column.name === 'metric') {
        return cellMetric.bind(this);
    }

    if (column.type === 'percentage' || column.type === 'currency') {
        return cellValueRender.bind(this);
    }

    return undefined;
}
