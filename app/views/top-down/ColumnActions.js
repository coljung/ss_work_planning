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
            columnData = [
                [
                    {
                        label: 'Metrics',
                        colspan: 2,
                    },
                    {
                        label: 'Total',
                        colspan: 6,
                    },
                    {
                        label: 'Women',
                        colspan: 7,
                    },
                    {
                        label: 'Men',
                        colspan: 7,
                    },
                ],
                [
                    "Name",
                    "Season",
                    "C-STD Pre Mkd",
                    "D-Incr %",
                    "E-STD Post Mkd",
                    "F-Incr %",
                    "G-Full Season",
                    "H-Incr %",
                    "I-STD Pre Mkd",
                    "J-Incr %",
                    "K-STD Post Mkd",
                    "L-Incr %",
                    "M-Full Season",
                    "N-Incr %",
                    "O-Cont %",
                    "P-STD Pre Mkd",
                    "Q-Incr %",
                    "R-STD Post Mkd",
                    "S-Incr %",
                    "T-Full Season",
                    "U-Incr %",
                    "V-Cont %",
                ],
            ];
            break;

        default:
            break;
    }

    return columnData;
}
