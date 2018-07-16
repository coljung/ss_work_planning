import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Spin } from 'antd';
import LoadingSpinner from '../../../../app/components/common/LoadingSpinner';
import i18n from 'i18next';
import sinon from 'sinon';

describe('<LoadingSpinner />', () => {
    it('should render base layout', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('spinner.loading').returns('Loading...');

        const wrapper = shallow(
            <LoadingSpinner style={{ fontSize: 20, color: '#777' }} />
        );

        const spin = wrapper.find(Spin).first();
        expect(shallowToJson(spin)).toMatchSnapshot();

        i18nStub.restore();
    });

    it('should render base layout with default text', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('spinner.loading').returns('Loading...');

        const wrapper = shallow(
            <LoadingSpinner />
        );

        const spin = wrapper.find(Spin).first();
        expect(spin.prop('tip')).toEqual('Loading...');

        i18nStub.restore();
    });

    it('should render base layout with custom text', () => {
        const wrapper = shallow(
            <LoadingSpinner text="Test" />
        );

        const spin = wrapper.find(Spin).first();
        expect(spin.prop('tip')).toEqual('Test');
    });
});
