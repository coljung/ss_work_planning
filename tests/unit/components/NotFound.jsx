import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../../app/components/NotFound';
import i18n from 'i18next';
import sinon from 'sinon';

describe('NotFound', () => {
    it('should render correctly', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('404.title').returns('404.title');
        i18nStub.withArgs('404.description').returns('404.description');

        const output = shallow(
            <NotFound />
        );

        expect(output.find('h1')).toHaveLength(1);
        expect(output.find('h1').text()).toEqual('404.title');

        expect(output.find('p')).toHaveLength(1);
        expect(output.find('p').text()).toEqual('404.description');

        i18nStub.restore();
    });
});
