import mergeMetrics from '../../../../../../app/views/top-down/common/grid/merge';

const expectedMergeDataNoGap = [ { row: 0, col: 0, rowspan: 3, colspan: 1 },
      { row: 3, col: 0, rowspan: 3, colspan: 1 },
      { row: 6, col: 0, rowspan: 3, colspan: 1 },
      { row: 9, col: 0, rowspan: 3, colspan: 1 } ];

const expectedMergeDataWithGap = [ { row: 0, col: 0, rowspan: 3, colspan: 1 },
      { row: 4, col: 0, rowspan: 3, colspan: 1 },
      { row: 3, col: 0, rowspan: 1, colspan: 20 },
      { row: 8, col: 0, rowspan: 3, colspan: 1 },
      { row: 7, col: 0, rowspan: 1, colspan: 20 } ];

describe('Merge functions', () => {

    it('should return Merge object without gaps', () => {
      const testNoGap = mergeMetrics(0, 3, 12, 20);
      expect(testNoGap).toEqual(expectedMergeDataNoGap);
    });

    it('should return Merge object without gaps', () => {
      const testWithGap = mergeMetrics(0, 3, 12, 20, true);
      console.log(testWithGap);
      expect(testWithGap).toEqual(expectedMergeDataWithGap);
    });

});
