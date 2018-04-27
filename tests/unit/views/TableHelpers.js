import { expect } from 'chai';
import Handsontable from 'handsontable';
import * as sinon from 'sinon';
import {
    borderLeft, borderBottom,
    currencyFormat, percentageFormat, enableEdit, disableEdit, emptyCell
} from '../../../app/views/TableHelpers';

describe('Helper functions', () => {
    describe('Currency Format', () => {
        it('should return a currency format', () => {
            expect(currencyFormat).to.be.an('object');
            expect(currencyFormat.pattern).to.contain('$');
        });
    });

    describe('Percentage Format', () => {
        it('should return a percentage format', () => {
            expect(percentageFormat).to.be.an('object');
            expect(percentageFormat.pattern).to.contain('%');
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
            const instance = new Handsontable(document.createElement("div"));
            let td = new Handsontable(document.createElement("td"));

            td = emptyCell(instance, td, 0, 0);

            expect(td.innerHTML).to.equal('N/A');
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

    /*
    it('should merge metrics', () => {
        const start_row = 0;
        const row_span = 1;
        const total = 10;
        const total_cols = 15;
        let has_gaps = true;
        let merged = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        expect(merged).toEqual([
            { row: 0, col: 0, rowspan: 1, colspan: 1 },
            { row: -1, col: 0, rowspan: 1, colspan: 15 },
            { row: 2, col: 0, rowspan: 1, colspan: 1 },
            { row: 1, col: 0, rowspan: 1, colspan: 15 },
            { row: 4, col: 0, rowspan: 1, colspan: 1 },
            { row: 3, col: 0, rowspan: 1, colspan: 15 },
            { row: 6, col: 0, rowspan: 1, colspan: 1 },
            { row: 5, col: 0, rowspan: 1, colspan: 15 },
            { row: 8, col: 0, rowspan: 1, colspan: 1 },
            { row: 7, col: 0, rowspan: 1, colspan: 15 }
        ]);

        has_gaps = false;
        merged = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        expect(merged).toEqual([
            { row: 0, col: 0, rowspan: 1, colspan: 1 },
            { row: 1, col: 0, rowspan: 1, colspan: 1 },
            { row: 2, col: 0, rowspan: 1, colspan: 1 },
            { row: 3, col: 0, rowspan: 1, colspan: 1 },
            { row: 4, col: 0, rowspan: 1, colspan: 1 },
            { row: 5, col: 0, rowspan: 1, colspan: 1 },
            { row: 6, col: 0, rowspan: 1, colspan: 1 },
            { row: 7, col: 0, rowspan: 1, colspan: 1 },
            { row: 8, col: 0, rowspan: 1, colspan: 1 },
            { row: 9, col: 0, rowspan: 1, colspan: 1 }
        ]);

        merged = mergeMetrics(start_row, row_span, total, total_cols);

        expect(merged).toEqual([
            { row: 0, col: 0, rowspan: 1, colspan: 1 },
            { row: 1, col: 0, rowspan: 1, colspan: 1 },
            { row: 2, col: 0, rowspan: 1, colspan: 1 },
            { row: 3, col: 0, rowspan: 1, colspan: 1 },
            { row: 4, col: 0, rowspan: 1, colspan: 1 },
            { row: 5, col: 0, rowspan: 1, colspan: 1 },
            { row: 6, col: 0, rowspan: 1, colspan: 1 },
            { row: 7, col: 0, rowspan: 1, colspan: 1 },
            { row: 8, col: 0, rowspan: 1, colspan: 1 },
            { row: 9, col: 0, rowspan: 1, colspan: 1 }
        ]);
    });
    */
});
