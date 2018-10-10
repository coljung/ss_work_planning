import { expect } from 'chai';
import * as sinon from 'sinon';
import i18n from 'i18next';
import Handsontable from 'handsontable';
import cellValueRenderer from '../../../../app/budgets/helpers/RowHeaderCellRenderer';

const createCell = (instance, row, col, viewInfo = { row_span: 5 }, info = { year: 2018, season: 'SS', metric: 'SALES', plan: 'wp' }) => {
    const stateContainer = {
        state: {
            viewData: {
                data: [],
                info: viewInfo,
            },
        },
    };

    for (let i = 0; i <= row; i++) {
        stateContainer.state.viewData.data.push({
            info,
        });
    }

    let td = document.createElement('td');

    return cellValueRenderer.call(stateContainer, instance, td, row, col, 'prop', '', {});
};

describe('Row header cell rendering', () => {
    let i18nStub;

    beforeEach(() => {
        i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('metric.SALES').returns('SALES');
        i18nStub.withArgs('plan.wp').returns('WP');
    });

    afterEach(() => {
        i18nStub.restore();
    });

    it('Should set correct row header', () => {
        const instance = new Handsontable(document.createElement('div'));

        const info = { year: 2018, season: 'SS', metric: 'SALES', plan: 'wp' };
        const cell = createCell(instance, 0, 0, { row_span: 1 }, info);

        expect(cell.innerHTML).to.equal('SALES SS18 (WP)');
    });

    it('Should not set a bottom border before row span', () => {
        const instance = new Handsontable(document.createElement('div'));

        const viewInfo = { row_span: 3 };

        const cell1 = createCell(instance, 0, 0, viewInfo);
        expect(cell1.className).to.not.contain('bottomCellBorder');

        const cell2 = createCell(instance, 0, 1, viewInfo);
        expect(cell2.className).to.not.contain('bottomCellBorder');
    });

    it('Should set a bottom border after row span', () => {
        const instance = new Handsontable(document.createElement('div'));

        const viewInfo = { row_span: 3, metrics: 1, total: 3 };

        createCell(instance, 0, 0, viewInfo);
        createCell(instance, 1, 0, viewInfo);
        const cell3 = createCell(instance, 2, 0, viewInfo);
        expect(cell3.className).to.contain('bottomCellBorder');
    });

    it('Should disable row header', () => {
        const instance = new Handsontable(document.createElement('div'));

        const spy = sinon.spy(instance, 'setCellMeta');

        createCell(instance, 0, 0);

        expect(spy.called).to.equal(true);
        expect(spy.getCall(0).args[2]).to.equal('readOnly');
        expect(spy.getCall(0).args[3]).to.equal(true);
    });
});
