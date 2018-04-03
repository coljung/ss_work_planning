import { summerSpringColumns, fallWinterColumns, leftBorderColumns, disabledRows, percentageRows, numberRows } from './common/grid/columns';
import { columns as execColumns, leftBorderColumns as execLeftBorderColumns, percentageRows as execPercentageRows, numberRows as execNumberRows } from './exec/grid-build/columns';
import { TAB_EXEC_RECAP, TAB_MEN, TAB_TOTAL, TAB_WOMEN } from '../BudgetViewsContainer';

export function fetchColumnData(view, data) {
    let columnData = {};

    switch (view) {
        case TAB_MEN:
        case TAB_WOMEN:
        case TAB_TOTAL:
            columnData = {
                columns: data.info.season === 'SS' ? summerSpringColumns : fallWinterColumns,
                summerSpringColumns,
                fallWinterColumns,
                leftBorderColumns,
                percentageRows,
                numberRows,
                disabledRows,
            };
            break;

        case TAB_EXEC_RECAP:
            columnData = {
                columns: execColumns,
                leftBorderColumns: execLeftBorderColumns,
                percentageRows: execPercentageRows,
                numberRows: execNumberRows,
            };
            break;

        default:
            break;
    }

    return columnData;
}
