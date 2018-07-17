import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TopDownSection from '../../../../../app/budgets/sections/top-down/TopDownSection';
import * as sinon from 'sinon';
import i18n from 'i18next';

describe('TopDownSection', () => {
    it('should render base layout', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetView.totalTab').returns('Total');
        i18nStub.withArgs('budgetView.womenTab').returns('Women');
        i18nStub.withArgs('budgetView.menTab').returns('Men');

        const output = shallow(
            <TopDownSection title="fsdfsdf">Hello Jest!</TopDownSection>
        );
        expect(shallowToJson(output)).toMatchSnapshot();

        i18nStub.restore();
    });
});
