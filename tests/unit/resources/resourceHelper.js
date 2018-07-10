import { expect } from "chai";
import { getDataRowName, getMetricName } from '../../../app/resources/resourceHelper';

describe('Resource helper', () => {
    describe('getMetricName', () => {
        it('should return correct metric name', () => {
            expect(getMetricName('Bom')).to.equal('BOP');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('Receipt')).to.equal('RECEIPT $');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('ReceiptPercentage')).to.equal('RECEIPT %');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('Cogs')).to.equal('COGS');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('Sales')).to.equal('SALES');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('GmDollar')).to.equal('GM$');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('GmPercentage')).to.equal('GM%');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('Turnover')).to.equal('TO');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('iSales')).to.equal('iSALES');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('iGmPercentage')).to.equal('iGM%');
        });

        it('should return default same value', () => {
            expect(getMetricName('test')).to.equal('test');
        });
    });

    describe('getDataRowName', () => {
        it('should return correct data row name', () => {
            expect(getDataRowName('tdwp')).to.equal('TDWP');
        });

        it('should return correct data row name', () => {
            expect(getDataRowName('achd')).to.equal('Actual');
        });

        it('should return default same value', () => {
            expect(getDataRowName('test')).to.equal('test');
        });
    });
});
