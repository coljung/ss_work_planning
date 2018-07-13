import { expect } from 'chai';
import Handsontable from 'handsontable';
import cellValueRenderer from '../../../../../app/budgets/sections/top-down/RowHeaderCellRenderer';
import * as sinon from 'sinon';
import i18n from 'i18next';

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
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('metric.SALES').returns('SALES');
        i18nStub.withArgs('plan.tdwp').returns('TDWP');

        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, {}, '', {}, { year: 2018, season: 'SS', metric: 'SALES', dataRow: 'tdwp' });

        expect(cell.innerHTML).to.equal('SALES - SS18 - TDWP');

        i18nStub.restore();
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

    it('should set class when same year for tdwp', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2018, season: 'SS', dataRow: 'tdwp' });

        expect(cell.className).to.contain('tdwpActive');
    });

    it('should set class when same year for achd', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2018, season: 'SS', dataRow: 'achd' });

        expect(cell.className).to.contain('actualActive');
    });

    it('should set not class when different year for tdwp', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2019, season: 'SS', dataRow: 'tdwp' });

        expect(cell.className).to.not.contain('tdwpActive');
    });

    it('should set not class when different year for achd', () => {
        const instance = new Handsontable(document.createElement('div'));

        const cell = createCell(instance, 0, 0, { prop: { isReadOnly: true } }, '', {}, { year: 2019, season: 'SS', dataRow: 'achd' });

        expect(cell.className).to.not.contain('actualActive');
    });
});
