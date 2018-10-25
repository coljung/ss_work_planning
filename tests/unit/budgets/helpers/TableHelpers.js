import { expect } from 'chai';
import Handsontable from 'handsontable';
import * as sinon from 'sinon';
import {
    borderLeft,
    borderBottom,
    currencyFormat,
    percentageFormat,
    enableEdit,
    disableEdit,
    numericFormat,
    cleanNumericInput,
    emptyCell } from '../../../../app/budgets/helpers/TableHelpers';
import i18n from 'i18next';

describe('Helper functions', () => {
    describe('Currency Format', () => {
        it('should return a currency format', () => {
            const tt = currencyFormat();
            expect(tt.pattern.output).to.equal('currency');
        });

        it('should return a currency format with no decimals', () => {
            const tt = currencyFormat(false);
            expect(tt.pattern.output).to.equal('currency');
            expect(tt.pattern.mantissa).to.equal(0);
        });

        it('should return a currency format with two decimal places', () => {
            const tt = currencyFormat(true);
            expect(tt.pattern.output).to.equal('currency');
            expect(tt.pattern.mantissa).to.equal(2);
        });
    });

    describe('Percentage Format', () => {
        it('should return a percentage format', () => {
            expect(percentageFormat).to.be.an('object');
            expect(percentageFormat.pattern.output).to.equal('percent');
            expect(percentageFormat.pattern.mantissa).to.equal(2);
        });
    });

    describe('Numeric Format', () => {
        it('should return a numeric format', () => {
            expect(numericFormat).to.be.an('object');
            expect(numericFormat.pattern.output).to.equal('number');
            expect(numericFormat.pattern.mantissa).to.equal(0);
        });
    });

    describe('Border Left', () => {
        it('should return proper class for borderLeft function', () => {
            const leftBorderCols = [
                'seasonyear',
                'stdpremarkdown',
                'previous',
            ];
            const td = document.createElement("td");
            borderLeft(leftBorderCols, 'stdpremarkdown', td);
            expect(td.className).to.contain(' leftCellBorder');
            const td2 = document.createElement("td");
            borderLeft(leftBorderCols, 'noclass', td2);
            expect(td2.className).not.contain(' leftCellBorder');
        });
    });

    describe('Border Bottom', () => {
        it('should return proper class for borderBottom function', () => {
            const td = document.createElement("td");
            borderBottom(4, 5, td, 10);
            expect(td.className).to.contain(' bottomCellBorder');
        });
    });

    describe('Cell readonly', () => {
        it('enableEdit should set readonly meta to true', () => {
            const instance = new Handsontable(document.createElement("div"));

            const spy = sinon.spy(instance, 'setCellMeta');

            enableEdit(instance, 0, 0);

            expect(spy.called).to.equal(true);
            expect(spy.getCall(0).args[2]).to.equal('readOnly');
            expect(spy.getCall(0).args[3]).to.equal(false);
        });

        it('disableEdit should set readonly meta to true', () => {
            const instance = new Handsontable(document.createElement("div"));

            const spy = sinon.spy(instance, 'setCellMeta');

            disableEdit(instance, 0, 0);

            expect(spy.called).to.equal(true);
            expect(spy.getCall(0).args[2]).to.equal('readOnly');
            expect(spy.getCall(0).args[3]).to.equal(true);
        });
    });

    describe('Empty cell', () => {
        it('should return a cell with N/A', () => {
            const spy = sinon.stub(i18n, 't');
            spy.withArgs('notAvailable').returns('N/A');

            const instance = new Handsontable(document.createElement("div"));
            let td = new Handsontable(document.createElement("td"));

            td = emptyCell(instance, td, 0, 0);

            expect(td.innerHTML).to.equal('N/A');
            expect(spy.called).to.equal(true);
            expect(spy.getCall(0).args[0]).to.equal('notAvailable');
        });

        it('should return a cell with proper class', () => {
            const instance = new Handsontable(document.createElement("div"));
            let td = new Handsontable(document.createElement("td"));

            td = emptyCell(instance, td, 0, 0);

            expect(td.className).to.contain(' cellNA');
        });

        it('should return a disabled cell', () => {
            const instance = new Handsontable(document.createElement("div"));
            let td = new Handsontable(document.createElement("td"));

            const spy = sinon.spy(instance, 'setCellMeta');

            emptyCell(instance, td, 0, 0);

            expect(spy.called).to.equal(true);
            expect(spy.getCall(0).args[2]).to.equal('readOnly');
            expect(spy.getCall(0).args[3]).to.equal(true);
        });
    });

    describe('cleanNumericInput', () => {

        it('Should return clean number when alpha numeric input', () => {
            const result = cleanNumericInput('$2,99');

            expect(result).to.be.equal(299.00);
        });

        it('Should parse Float number when alpha numeric input', () => {
            const result = cleanNumericInput('$2,99k300.40');

            expect(result).to.be.equal(299300.40);
        });

    });
});
