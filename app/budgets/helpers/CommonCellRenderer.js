import Handsontable from 'handsontable'; // eslint-disable-line import/no-extraneous-dependencies
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
        if ((this.state.viewData.info.year === this.state.viewData.data[row].info.year)) {
            td.className += ' firstYearRow';
        }
        if (metricInformation.isReadOnly !== undefined) {
            instance.setCellMeta(row, col, 'readOnly', metricInformation.isReadOnly);
            if (!metricInformation.isReadOnly) {
                td.className += ' editableRow';
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
                instance.setCellMeta(row, col, 'numericFormat', currencyFormat(this.props.useDecimals, this.props.config.formattingConfiguration.currencyDecimals.display));
                // eslint-disable-next-line prefer-rest-params
                Handsontable.renderers.NumericRenderer.apply(this, arguments);
                break;
            }
            case 'percentage':
                if (this.state.viewData.data[row].info.metric === 'GmPercentage') {
                    this.props.config.formattingConfiguration.percentageDecimals.display = 1;
                } else {
                    this.props.config.formattingConfiguration.percentageDecimals.display = 0;
                }
                instance.setCellMeta(row, col, 'numericFormat', percentageFormat(this.props.config.formattingConfiguration.percentageDecimals.display));
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
