import { borderLeft, borderBottom, mergeMetrics, enableCellValidDate } from '../../../app/views/TableHelpers';
import Handsontable from 'handsontable';

const data = [
    {
      metric: 123,
      test: 222,
    },
    {
      metric: 456,
      test: 333,
    },
    {
        metric: 123,
        test: 222,
    },
    {
        metric: 456,
        test: 333,
    },
    {
      metric: 123,
      test: 222,
    },
    {
      metric: 456,
      test: 333,
    }
];
const myDiv = document.createElement("div");

describe('Helper functions', () => {
    // borderLeft
    it('should return proper class for borderLeft function', () => {
      const leftBorderCols = [
          'seasonyear',
          'stdpremarkdown',
          'previous',
      ];
      const td = document.createElement("td");
      borderLeft(leftBorderCols, 'stdpremarkdown', td);
      expect(td.className).toBe(' leftCellBorder');
    });

    // borderBottom
    it('should return proper class for borderBottom function', () => {
        const td = document.createElement("td");
        borderBottom(4, 5, td, 10);
        expect(td.className).toBe(' bottomCellBorder');
    });

    // borderBottom
    it('should return proper class for percentageMetrics function', () => {
        const td = document.createElement("td");
        var hot = new Handsontable(myDiv, {
            data: data,
            rowHeaders: true,
            colHeaders: true,
            columns: [
                {data: "metric"},
                {data: "test", renderer: coverRenderer}
            ]
        });

        function coverRenderer (instance, td, row, col, prop, value, cellProperties) {
           console.log(value);

           return td;
         }
         console.log(myDiv.innerHTML);
    });

    it('should return proper class for bottom border', () => {
        const nextYear = `SS${((new Date()).getFullYear() + 1).toString().substr(-2)}`;
        const returnedElem = enableCellValidDate('dec1', nextYear);
        expect(parseInt(returnedElem.cellCode)).toBeGreaterThan(parseInt(returnedElem.viewCode));
    });

    it('should merge metrics', () => {
        const start_row = 0;
        const row_span = 1;
        const total = 10;
        const total_cols = 15;
        let has_gaps = true;
        let merged = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        expect(merged).toEqual([
            { row: 0, col: 0, rowspan: 1, colspan: 1 },
            { row: -1, col: 0, rowspan: 1, colspan: 15 },
            { row: 2, col: 0, rowspan: 1, colspan: 1 },
            { row: 1, col: 0, rowspan: 1, colspan: 15 },
            { row: 4, col: 0, rowspan: 1, colspan: 1 },
            { row: 3, col: 0, rowspan: 1, colspan: 15 },
            { row: 6, col: 0, rowspan: 1, colspan: 1 },
            { row: 5, col: 0, rowspan: 1, colspan: 15 },
            { row: 8, col: 0, rowspan: 1, colspan: 1 },
            { row: 7, col: 0, rowspan: 1, colspan: 15 }
        ]);

        has_gaps = false;
        merged = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        expect(merged).toEqual([
            { row: 0, col: 0, rowspan: 1, colspan: 1 },
            { row: 1, col: 0, rowspan: 1, colspan: 1 },
            { row: 2, col: 0, rowspan: 1, colspan: 1 },
            { row: 3, col: 0, rowspan: 1, colspan: 1 },
            { row: 4, col: 0, rowspan: 1, colspan: 1 },
            { row: 5, col: 0, rowspan: 1, colspan: 1 },
            { row: 6, col: 0, rowspan: 1, colspan: 1 },
            { row: 7, col: 0, rowspan: 1, colspan: 1 },
            { row: 8, col: 0, rowspan: 1, colspan: 1 },
            { row: 9, col: 0, rowspan: 1, colspan: 1 }
        ]);

        merged = mergeMetrics(start_row, row_span, total, total_cols);

        expect(merged).toEqual([
            { row: 0, col: 0, rowspan: 1, colspan: 1 },
            { row: 1, col: 0, rowspan: 1, colspan: 1 },
            { row: 2, col: 0, rowspan: 1, colspan: 1 },
            { row: 3, col: 0, rowspan: 1, colspan: 1 },
            { row: 4, col: 0, rowspan: 1, colspan: 1 },
            { row: 5, col: 0, rowspan: 1, colspan: 1 },
            { row: 6, col: 0, rowspan: 1, colspan: 1 },
            { row: 7, col: 0, rowspan: 1, colspan: 1 },
            { row: 8, col: 0, rowspan: 1, colspan: 1 },
            { row: 9, col: 0, rowspan: 1, colspan: 1 }
        ]);
    });
});
