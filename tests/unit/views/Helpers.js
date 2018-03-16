import { borderLeft, borderBottom, enableCellValidDate } from '../../../app/views/Helpers';

describe('Helper functions', () => {

    it('should return proper class for left border', () => {
      const leftBorderCols = [
          'seasonyear',
          'stdpremarkdown',
          'previous',
      ];
      const td = document.createElement("td");
      const returnedElem =  borderLeft(leftBorderCols, 'stdpremarkdown', td);
      expect(returnedElem.className).toBe(' leftCellBorder');
    });

    it('should return proper class for bottom border', () => {
        const td = document.createElement("td");
        const returnedElem =  borderBottom(4, 5, td, 10);
        expect(returnedElem.className).toBe(' bottomCellBorder');
    });

    it('should return proper class for bottom border', () => {
        const nextYear = `SS${((new Date()).getFullYear() + 1).toString().substr(-2)}`;
        const returnedElem = enableCellValidDate('dec1', nextYear);
        expect(parseInt(returnedElem.cellCode)).toBeGreaterThan(parseInt(returnedElem.viewCode));
    });

});
