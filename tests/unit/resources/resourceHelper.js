import { expect } from "chai";
import { getPlanTypeName, getMetricName } from '../../../app/resources/resourceHelper';

describe('Resource helper', () => {
    describe('getMetricName', () => {
        it('should return correct metric name', () => {
            expect(getMetricName('BOM COST')).to.equal('BOP');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('RECEIVED COST')).to.equal('RECEIPT $');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('ReceiptPercentage')).to.equal('RECEIPT %');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('COGS')).to.equal('COGS');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('SALES')).to.equal('SALES');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('GmDollar')).to.equal('GM$');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('GmPercentage')).to.equal('GM%');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('TURNOVER')).to.equal('TO');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('iRETAIL')).to.equal('iSALES');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('iGmPercentage')).to.equal('iGM%');
        });

        it('should return default same value', () => {
            expect(getMetricName('test')).to.equal('test');
        });
    });

    describe('getPlanTypeName', () => {
        it('should return correct data row name', () => {
            expect(getPlanTypeName('wp')).to.equal('WORKING PLAN');
        });

        it('should return correct data row name', () => {
            expect(getPlanTypeName('achd')).to.equal('Actual');
        });

        it('should return default same value', () => {
            expect(getPlanTypeName('test')).to.equal('test');
        });
    });
});
