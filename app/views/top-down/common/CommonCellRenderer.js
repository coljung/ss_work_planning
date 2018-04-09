import Handsontable from 'handsontable';
import { TAB_TOTAL } from '../../BudgetViewsContainer';
import { borderLeft, enableCellValidDate, percentageRow, numberRow, disableRowCell, disableEdit, enableEdit } from '../../TableHelpers';

function cellMetric(instance, td, row, col, prop, value, cellProperties) {
    td.className += ' metricCell';

    return td;
}

function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
    // styling border left per section
    borderLeft(this.state.columnData.leftBorderColumns, prop, td);

    // showing N/A instead of error
    if (isNaN(parseInt(value, 10))) {
        td.innerHTML = 'N/A';
        td.className += ' cellNA';

        disableEdit(instance, row, col);

        return td;
    }

    // eslint-disable-next-line prefer-rest-params
    Handsontable.renderers.NumericRenderer.apply(this, arguments);

    if (this.props.view === TAB_TOTAL) {
        disableEdit(instance, row, col);
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
    }

    disableRowCell(this.state.columnData.disabledRows || [], instance, row, col);
    percentageRow(this.state.columnData.percentageRows || [], instance, row, col);
    numberRow(this.state.columnData.numberRows || [], instance, row, col);

    return td;
}

const cellRendererFactory = (column) => {
// export function cellRendererFactory(column) {
    if (column.name === 'metric') {
        return cellMetric.bind(this);
    }

    if (column.type === 'percentage' || column.type === 'currency') {
        return cellValueRender.bind(this);
    }

    return undefined;
};

export default cellRendererFactory;
