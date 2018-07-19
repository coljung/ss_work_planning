import { expect } from 'chai';
import Handsontable from 'handsontable';
import cellValueRenderer from '../../../../../app/budgets/sections/top-down/CommonCellRenderer';
import * as sinon from 'sinon';
import { percentageFormat, numericFormat } from '../../../../../app/budgets/components/TableHelpers';
import { TAB_TOTAL } from '../../../../../app/budgets/sections/top-down/TopDownSection';
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
    it('should set readonly true based on data', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { isReadOnly: true } });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        // temp change for cell change forcing radonly = false
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should set readonly false based on data', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { isReadOnly: false } });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(false);
    });

    it('should return empty cell when no data type', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('notAvailable').returns('N/A');

        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        const cell = createCell(instance, 0, 0);

        expect(cell.innerHTML).to.equal('N/A');
        expect(cell.className).to.contain('cellNA');

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);

        i18nStub.restore();
    });

    it('should return empty cell when invalid currency', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('notAvailable').returns('N/A');

        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        const cell = createCell(instance, 0, 0, { prop: { dataType: 'currency' } }, 'invalid number');

        expect(cell.innerHTML).to.equal('N/A');
        expect(cell.className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);

        i18nStub.restore();
    });

    it('should return empty cell when invalid percent', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('notAvailable').returns('N/A');

        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        const cell = createCell(instance, 0, 0, { prop: { dataType: 'percentage' } }, 'invalid number');

        expect(cell.innerHTML).to.equal('N/A');
        expect(cell.className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);

        i18nStub.restore();
    });

    it('should return empty cell when invalid number', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('notAvailable').returns('N/A');

        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        const cell = createCell(instance, 0, 0, { prop: { dataType: 'number' } }, 'invalid number');

        expect(cell.innerHTML).to.equal('N/A');
        expect(cell.className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);

        i18nStub.restore()
    });

    it('should return currency cell based on data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'currency' }}, 99, { location: { query: { decimals: 'yes' }}});

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('numericFormat');
    });

    it('should return percentage cell based on data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'percentage' } }, 99);

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('numericFormat');
        expect(spy.getCall(0).args[3]).to.equal(percentageFormat);
    });

    it('should return numeric cell based on data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'number' } }, 99);

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('numericFormat');
        expect(spy.getCall(0).args[3]).to.equal(numericFormat);
    });

    it('should return text cell based on data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'text' } }, '99');

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('numericFormat');
        expect(spy.getCall(0).args[3]).to.equal(null);
    });

    it('should set readonly in total view', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'currency' } }, 99, { view: TAB_TOTAL, location: { query: { decimals: 'yes ' }} });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
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
