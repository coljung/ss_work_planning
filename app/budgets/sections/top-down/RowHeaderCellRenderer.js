import {
    borderBottom,
    disableEdit,
    gridColors,
} from '../../components/TableHelpers';
import { getPlanTypeName, getMetricName } from '../../../resources/resourceHelper';

export default function cellRenderer(instance, td, row, col, prop, value, cellProperties) {
    const rowInformation = this.state.data[row].info;
    const rowSpan = this.state.info.row_span;

    const metric = getMetricName(rowInformation.metric);
    const plan = getPlanTypeName(rowInformation.plan);
    const rowYear = rowInformation.year.toString().slice(2, 4);
    const budgetYear = this.state.info.year.slice(2, 4);

    td.innerHTML = `${metric} - ${rowInformation.season}${rowYear} - ${plan}`;

    if (budgetYear === rowYear) {
        gridColors(rowInformation.plan, td);
    }

    borderBottom(row, rowSpan, td);
    disableEdit(instance, row, col);

    return td;
}
