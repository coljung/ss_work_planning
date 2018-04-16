import Handsontable from 'handsontable';
import { TAB_TOTAL } from '../../BudgetViewsContainer';
import {
    enableCellValidDate, disableEdit, enableEdit, emptyCell,
    percentageFormat, currencyFormat,
} from '../../TableHelpers';

export function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    // styling border left per section
    // borderLeft(this.state.columnData.leftBorderColumns, prop, td);

    const propertyPath = prop;
    const split = propertyPath.split('.');
    const metricInformation = this.state.data[row][split[0]];

    if (metricInformation && metricInformation.readOnly !== undefined) {
        instance.setCellMeta(row, col, 'readOnly', metricInformation.readOnly);
    }

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

    // disableRowCell(this.state.columnData.disabledRows || [], instance, row, col);
    // percentageRow(this.state.columnData.percentageRows || [], instance, row, col);
    // numberRow(this.state.columnData.numberRows || [], instance, row, col);

    return td;
}
