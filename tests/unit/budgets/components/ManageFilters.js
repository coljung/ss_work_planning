import * as sinon from 'sinon';
import filterData from '../../../../app/budgets/components/ManageFilters';

describe('ManageFilters functions', () => {

    describe('Border Left', () => {
        it('should return proper filters', () => {
            const testFilters = {
                available_metrics: ['Test1', 'Test2']
            }
            const filters = filterData(testFilters);

            expect(filters.checkedKeys).toEqual(['Test1', 'Test2']);
        });
    });


});
