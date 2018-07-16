import { expect } from 'chai';
import Handsontable from 'handsontable';
import cellValueRenderer from '../../../../../app/budgets/sections/top-down/RowHeaderCellRenderer';
import * as sinon from 'sinon';

const createCell = (instance, row, col, data = {}, value = '', props = {}, info = { year: 2018, season: 'SS' }) => {
    const stateContainer = {
        state: {
            data: [],
            info: {
                year: 'SS18',
            },
        },
        props,
    };

    for (let i = 0; i <= row; i++) {
        stateContainer.state.data.push({
            info,
            ...data
        });
    }

    let td = document.createElement('td');

    return cellValueRenderer.call(stateContainer, instance, td, row, col, 'prop', value, {});
};

describe('Common view cell rendering', () => {
    it('should set proper row header', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, {}, '', {}, { year: 2018, season: 'SS', metric: 'SALES', plan: 'wp' });

        expect(cell.innerHTML).to.equal('SALES - SS18 - WORKING PLAN');
    });

    it('should set readonly always', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { isReadOnly: true } });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        // temp change for cell change forcing radonly = false
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should set class when same year for wp', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2018, season: 'SS', plan: 'wp' });

        expect(cell.className).to.contain('wpActive');
    });

    it('should set class when same year for achd', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2018, season: 'SS', plan: 'achd' });

        expect(cell.className).to.contain('actualActive');
    });

    it('should set not class when different year for wp', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2019, season: 'SS', plan: 'wp' });

        expect(cell.className).to.not.contain('wpActive');
    });

    it('should set not class when different year for achd', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2019, season: 'SS', plan: 'achd' });

        expect(cell.className).to.not.contain('actualActive');
    });
});
