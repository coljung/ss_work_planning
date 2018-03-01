import { defaultMetricSequence, mergeHeadersExecRecap, mergeMetrics } from '../../app/Helpers';
import getApiUrl from '../../app/Helpers';

describe('Helpers functions', () => {
    it('should get the API URL', () => expect(getApiUrl()).toEqual('http://127.0.0.1/api/'));

    it('should get default metric query string', () => {
        expect(defaultMetricSequence()).toEqual(
            'SALES,COGS,GM$,GM%,RECEIVED COST,RECEIPT%,BOM COST,iRETAIL,iGM%,TURNOVER RATE',
    );
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
      { row: 7, col: 0, rowspan: 1, colspan: 15 },
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
      { row: 9, col: 0, rowspan: 1, colspan: 1 },
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
      { row: 9, col: 0, rowspan: 1, colspan: 1 },
        ]);
    });

    it('should merge header exec recap', () => {
        expect(mergeHeadersExecRecap()).toEqual([
        { row: 0, col: 0, rowspan: 1, colspan: 2 },
        { row: 0, col: 2, rowspan: 1, colspan: 6 },
        { row: 0, col: 8, rowspan: 1, colspan: 7 },
        { row: 0, col: 15, rowspan: 1, colspan: 7 },
        ]);
    });
});
