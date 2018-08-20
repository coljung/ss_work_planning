import React from 'react';
import { shallow } from 'enzyme';
import CheckedRadioGroup from '../../../../app/components/common/CheckedRadioGroup';
import i18n from 'i18next';
import sinon from 'sinon';

describe.skip('<CheckedRadioGroup />', () => {
    it('should render base layout with default text', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('year.1').returns('year.1');

        const wrapper = shallow(
            <CheckedRadioGroup />
        );

        const span1y = wrapper.find('span').at(0);
        expect(span1y.prop('value').at(0)).toEqual('1');
        expect(span1y.prop('tip').at(1).innerHTML).toEqual('1Y');

        const span2y = wrapper.find('span').at(1);
        expect(span2y.prop('value').at(0)).toEqual('1');
        expect(span2y.prop('tip').at(1).innerHTML).toEqual('1Y');

        const span3y = wrapper.find('span').at(2);
        expect(span3y.prop('value').at(0)).toEqual('1');
        expect(span3y.prop('tip').at(1).innerHTML).toEqual('1Y');

        const span5y = wrapper.find('span').at(3);
        expect(span5y.prop('value').at(0)).toEqual('1');
        expect(span5y.prop('tip').at(1).innerHTML).toEqual('1Y');


        i18nStub.restore();
    });

    it('should render base layout with custom text', () => {
        const wrapper = shallow(
            <CheckedRadioGroup text='Test' />
        );

        const spin = wrapper.find(Spin);
        expect(spin.prop('tip')).toEqual('Test');
    });

    it('should render base layout with custom class', () => {
        const wrapper = shallow(
            <CheckedRadioGroup text='Test' classUsed='test-class' />
        );

        const div = wrapper.find('div');
        expect(div.prop('className')).toEqual('ant-radio-group');
    });
});
