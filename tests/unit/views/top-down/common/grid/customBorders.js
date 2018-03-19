import customBorders from '../../../../../../app/views/top-down/common/grid/customBorders';

const expectedCustomBorders = [{"range": {"from": {"col": 0, "row": 0}, "to": {"col": 19, "row": 0}}, "top": {"color": "#222", "width": 1}}, {"range": {"from": {"col": 0, "row": 3}, "to": {"col": 19, "row": 3}}, "top": {"color": "#222", "width": 1}}, {"range": {"from": {"col": 0, "row": 6}, "to": {"col": 19, "row": 6}}, "top": {"color": "#222", "width": 1}}, {"range": {"from": {"col": 0, "row": 9}, "to": {"col": 19, "row": 9}}, "top": {"color": "#222", "width": 1}}];

describe('Merge functions', () => {

    it('should return Merge object without gaps', () => {
      const testBorders = customBorders(0, 3, 12, 20, 'test');
      expect(testBorders).toEqual(expectedCustomBorders);
    });


});
