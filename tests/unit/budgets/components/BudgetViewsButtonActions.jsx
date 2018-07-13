import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BudgetViewsButtonActions from '../../../../app/budgets/components/BudgetViewsButtonActions';
import * as sinon from 'sinon';
import i18n from 'i18next';

describe('BudgetViewsButtonActions', () => {
    it('should render base layout', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetView.backButton').returns('Back');
        i18nStub.withArgs('budgetView.filter').returns('Filter');
        i18nStub.withArgs('budgetView.undoButton').returns('Undo');
        i18nStub.withArgs('budgetView.redoButton').returns('Redo');
        i18nStub.withArgs('budgetView.exportButton').returns('Export');

        const output = shallow(
            <BudgetViewsButtonActions saveNew="func">Hello Jest!</BudgetViewsButtonActions>
        );
        expect(shallowToJson(output)).toMatchSnapshot();

        i18nStub.restore();
    });
});
