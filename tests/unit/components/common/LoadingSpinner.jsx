import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import LoadingSpinner from '../../../../app/components/common/LoadingSpinner';
import i18n from 'i18next';
import sinon from 'sinon';

describe('<LoadingSpinner />', () => {
    it('should render base layout with default text', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('spinner.loading').returns('spinner.loading');

        const wrapper = shallow(
            <LoadingSpinner />
        );

        const spin = wrapper.find(Spin);
        expect(spin.prop('tip')).toEqual('spinner.loading');

        i18nStub.restore();
    });

    it('should render base layout with custom text', () => {
        const wrapper = shallow(
            <LoadingSpinner text='Test' />
        );

        const spin = wrapper.find(Spin);
        expect(spin.prop('tip')).toEqual('Test');
    });

    it('should render base layout with custom class', () => {
        const wrapper = shallow(
            <LoadingSpinner text='Test' classUsed='test-class' />
        );

        const div = wrapper.find('div');
        expect(div.prop('className')).toEqual('test-class');
    });
});
