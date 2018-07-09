import { expect } from "chai";
import { getDataRowName, getMetricName } from '../../../app/resources/resourceHelper';

describe('Resource helper', () => {
    describe('getMetricName', () => {
        it('should return correct metric name', () => {
            expect(getMetricName('BOM COST')).to.equal('BOP');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('RECEIVED COST')).to.equal('RECEIPT $');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('RECEIPT %')).to.equal('RECEIPT %');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('COGS')).to.equal('COGS');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('SALES')).to.equal('SALES');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('GM$')).to.equal('GM$');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('GM%')).to.equal('GM%');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('TURNOVER')).to.equal('TO');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('iRETAIL')).to.equal('iSALES');
        });

        it('should return correct metric name', () => {
            expect(getMetricName('iGM%')).to.equal('iGM%');
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
