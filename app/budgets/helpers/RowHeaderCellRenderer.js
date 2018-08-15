import i18n from 'i18next';
import {
    borderBottom,
    disableEdit,
} from './TableHelpers';

export default function cellRenderer(instance, td, row, col, prop, value, cellProperties) {
    const rowInformation = this.props.viewData.data[row].info;
    const rowSpan = this.props.viewData.info.row_span;

    const metric = i18n.t(`metric.${rowInformation.metric}`);
    const plan = i18n.t(`plan.${rowInformation.plan}`);
    const rowYear = rowInformation.year.toString().slice(2, 4);

    td.innerHTML = `${metric} - ${rowInformation.season}${rowYear} - ${plan}`;

    borderBottom(row, rowSpan, td);
    disableEdit(instance, row, col);

    return td;
}