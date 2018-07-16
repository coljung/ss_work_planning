import i18n from 'i18next';
import {
    borderBottom,
    disableEdit,
    gridColors,
} from '../../components/TableHelpers';

export default function cellRenderer(instance, td, row, col, prop, value, cellProperties) {
    const rowInformation = this.state.data[row].info;
    const rowSpan = this.state.info.row_span;

    const metric = i18n.t(`metric.${rowInformation.metric}`);
    const dataRow = i18n.t(`plan.${rowInformation.dataRow}`);
    const rowYear = rowInformation.year.toString().slice(2, 4);
    const budgetYear = this.state.info.year.slice(2, 4);

    td.innerHTML = `${metric} - ${rowInformation.season}${rowYear} - ${dataRow}`;

    if (budgetYear === rowYear) {
        gridColors(rowInformation.dataRow, td);
    }

    borderBottom(row, rowSpan, td);
    disableEdit(instance, row, col);

    return td;
}
