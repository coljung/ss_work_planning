import { expect } from 'chai';
import Handsontable from 'handsontable';
// import { cellValueRenderer } from 'views/sections/top-down/ExecCellRenderer';
import { cellValueRenderer } from '../../../../../app/views/sections/top-down/ExecCellRenderer';
import * as sinon from 'sinon';
import { currencyFormat, percentageFormat } from '../../../../../app/views/components/TableHelpers';

const createCell = (instance, row, col, data = {}, value = '') => {
    const stateContainer = {
        state: {
            data: [],
        }
    };

    for (let i = 0; i <= row; i++) {
        stateContainer.state.data.push(data);
    }

    let td = document.createElement('td');

    return cellValueRenderer.call(stateContainer, instance, td, row, col, 'prop', value, {});
}

describe('Exec view cell rendering', () => {
    it('should set a different background for some rows and cols', () => {
        const instance = new Handsontable(document.createElement('div'));

        expect(createCell(instance, 0, 0).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 0, 1).style.background).to.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 0, 2).style.background).to.equal('rgb(238, 238, 238)');

        expect(createCell(instance, 1, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 2, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 3, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 4, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 5, 0).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 5, 1).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 5, 2).style.background).to.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 5, 3).style.background).to.equal('rgb(238, 238, 238)');

        expect(createCell(instance, 6, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 7, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 8, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 9, 2).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 10, 0).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 10, 1).style.background).to.not.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 10, 2).style.background).to.equal('rgb(238, 238, 238)');
        expect(createCell(instance, 10, 3).style.background).to.equal('rgb(238, 238, 238)');
    });

    it('should set bottom borders', () => {
        const instance = new Handsontable(document.createElement('div'));

        expect(createCell(instance, 0, 0).className).to.not.contain('bottomCellBorder');
        expect(createCell(instance, 1, 0).className).to.not.contain('bottomCellBorder');
        expect(createCell(instance, 2, 0).className).to.not.contain('bottomCellBorder');
        expect(createCell(instance, 3, 0).className).to.contain('bottomCellBorder');

        expect(createCell(instance, 4, 0).className).to.not.contain('bottomCellBorder');
        expect(createCell(instance, 5, 0).className).to.not.contain('bottomCellBorder');
        expect(createCell(instance, 6, 0).className).to.not.contain('bottomCellBorder');
        expect(createCell(instance, 7, 0).className).to.contain('bottomCellBorder');
    });

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
});
