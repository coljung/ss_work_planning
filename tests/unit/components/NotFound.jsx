import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import NotFound from '../../../app/components/NotFound';
import i18n from 'i18next';
import sinon from 'sinon';

describe('NotFound', () => {
    it('should render correctly', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('404.title').returns('404!');
        i18nStub.withArgs('404.description').returns('Page not found');

        const output = shallow(
            <NotFound ></NotFound>
        );
        expect(shallowToJson(output)).toMatchSnapshot();

        i18nStub.restore();
    });
});
