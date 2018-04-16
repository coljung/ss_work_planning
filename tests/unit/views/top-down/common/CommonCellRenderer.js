import { expect } from 'chai';
import Handsontable from 'handsontable';
import { cellValueRenderer } from 'top_down/common/CommonCellRenderer';
import * as sinon from 'sinon';
import { currencyFormat, percentageFormat } from '../../../../../app/views/TableHelpers';
import { TAB_TOTAL } from '../../../../../app/views/BudgetViewsContainer';

const createCell = (instance, row, col, data = {}, value = '', props = {}) => {
    const stateContainer = {
        state: {
            data: [],
        },
        props
    };

    for (let i = 0; i <= row; i++) {
        stateContainer.state.data.push(data);
    }

    let td = document.createElement('td');

    return cellValueRenderer.call(stateContainer, instance, td, row, col, 'prop', value, {});
}

describe('Common view cell rendering', () => {
    it('should set readonly based on data', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { isReadOnly: true } });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should set readonly based on data', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { isReadOnly: false } });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(false);
    });

    it('should return empty cell when no data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0);

        expect(createCell(instance, 0, 0).innerHTML).to.equal('N/A');
        expect(createCell(instance, 0, 0).className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should return empty cell when invalid currency', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'currency' } }, 'invalid number');

        expect(createCell(instance, 0, 0).innerHTML).to.equal('N/A');
        expect(createCell(instance, 0, 0).className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should return empty cell when invalid percent', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'percentage' } }, 'invalid number');

        expect(createCell(instance, 0, 0).innerHTML).to.equal('N/A');
        expect(createCell(instance, 0, 0).className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should return empty cell when invalid number', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'number' } }, 'invalid number');

        expect(createCell(instance, 0, 0).innerHTML).to.equal('N/A');
        expect(createCell(instance, 0, 0).className).to.contain('cellNA');
        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });

    it('should return currency cell based on data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'currency' } }, 99);

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('numericFormat');
        expect(spy.getCall(0).args[3]).to.equal(currencyFormat);
    });

    it('should return percentage cell based on data type', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0, { prop: { dataType: 'percentage' } }, 99);

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('numericFormat');
        expect(spy.getCall(0).args[3]).to.equal(percentageFormat);
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

        createCell(instance, 0, 0, { prop: { dataType: 'currency' } }, 99, { view: TAB_TOTAL });

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });
});
