import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import LoadingSpinner from '../../../../app/components/common/LoadingSpinner';

describe('<LoadingSpinner />', () => {
    it('should render base layout', () => {
        const wrapper = shallow(
            <LoadingSpinner />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should render base layout with default text', () => {
        const wrapper = shallow(
            <LoadingSpinner />
        );

        const spin = wrapper.find(Spin).first();
        expect(spin.prop('tip')).toEqual('Loading...');
    });

    it('should render base layout with custom text', () => {
        const wrapper = shallow(
            <LoadingSpinner text="Test" />
        );

        const spin = wrapper.find(Spin).first();
        expect(spin.prop('tip')).toEqual('Test');
    });
});
