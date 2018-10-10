import Handsontable from 'handsontable';
import {
    borderBottom,
    currencyFormat,
    emptyCell,
    numericFormat,
    percentageFormat,
 } from './TableHelpers';

export default function cellValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    // styling border for each metric
    const rowSpan = (+this.state.viewData.info.total / +this.state.viewData.info.metrics);
    borderBottom(row, rowSpan, td);

    const colName = prop.split('.');
    const metricInformation = this.state.viewData.data[row][colName[0]];

    if (metricInformation) {
        if ((row % rowSpan === 0)){
            td.style.fontWeight = 'bold';
            td.style.color = '#2f2f2f';
            td.style.background = '#efefef';
        }
        if (metricInformation.isReadOnly !== undefined) {
            instance.setCellMeta(row, col, 'readOnly', metricInformation.isReadOnly);
            if(!metricInformation.isReadOnly){
                td.style.background = '#eec38e';
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
            case 'currency': {
                instance.setCellMeta(row, col, 'numericFormat', currencyFormat(this.props.useDecimals));
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
