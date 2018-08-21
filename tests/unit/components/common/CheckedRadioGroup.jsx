import React from 'react';
import { shallow } from 'enzyme';
import CheckedRadioGroup from '../../../../app/components/common/CheckedRadioGroup';
import { Checkbox, Radio } from 'antd';

describe('<CheckedRadioGroup />', () => {
    it('should render with default checked value', () => {
        const wrapper = shallow(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={[]} />
        );

        const checkbox = wrapper.find(Checkbox);
        expect(checkbox.prop('checked')).toBeFalsy();
    });

    it('should render with passed checked value', () => {
        const wrapper = shallow(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={[]}
                checked={true} />
        );

        const checkbox = wrapper.find(Checkbox);
        expect(checkbox.prop('checked')).toBeTruthy();
    });

    it('should render base layout with custom text', () => {
        const wrapper = shallow(
            <CheckedRadioGroup
                text='Test'
                onChange={jest.fn()}
                name=''
                options={[]} />
        );

        const checkbox = wrapper.find(Checkbox);
        expect(checkbox.childAt(0).text()).toEqual('Test');
    });

    it('should change the checked value when checking', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={[]}
                checked={false} />
        );

        wrapper.find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: true } });

        expect(wrapper.state('checked')).toBeTruthy();
    });

    it('should call check callback when checking', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={[]} />
        );

        wrapper.find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: true } });

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should pass checked value in check callback', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={[]} />
        );

        wrapper.find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: true } });

        const args = onChange.mock.calls[0];
        expect(args[1]).toBeTruthy();
    });

    it('should pass selected option in check callback', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={[1, 2]}
                selectedOption={1} />
        );

        wrapper.find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: true } });

        const args = onChange.mock.calls[0];
        expect(args[2]).toEqual(1);
    });

    it('should pass no selection option in check callback', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={[1, 2]} />
        );

        wrapper.find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: true } });

        const args = onChange.mock.calls[0];
        expect(args[2]).toBeUndefined();
    });

    it('should render base layout with options', () => {
        const options = [1, 2].map(x => ({
            label: x,
            value: x,
        }));

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={options} />
        );

        const option1 = wrapper.find(Radio).at(0);
        expect(option1.prop('value')).toEqual(1);
        expect(option1.text()).toEqual('1');

        const option2 = wrapper.find(Radio).at(1);
        expect(option2.prop('value')).toEqual(2);
        expect(option2.text()).toEqual('2');
    });

    it('should have disabled options when unchecked', () => {
        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={[1, 2]}
                checked={false} />
        );

        const radioGroup = wrapper.find(Radio.Group);
        expect(radioGroup.prop('disabled')).toBeTruthy();
    });

    it('should have enabled options when checked', () => {
        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={[1, 2]}
                checked={true} />
        );

        const radioGroup = wrapper.find(Radio.Group);
        expect(radioGroup.prop('disabled')).toBeFalsy();
    });

    it('should have no option selected by default', () => {
        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={[1, 2]} />
        );

        const radioGroup = wrapper.find(Radio.Group);
        expect(radioGroup.prop('value')).toBeUndefined();
    });

    it('should select passed option', () => {
        const options = [1, 2].map(x => ({
            label: x,
            value: x,
        }));

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={jest.fn()}
                name=''
                options={options}
                selectedOption={2} />
        );

        const radioGroup = wrapper.find(Radio.Group);
        expect(radioGroup.prop('value')).toEqual(2);
    });

    it.skip('should call callback when selection option', () => {
        const options = [1, 2].map(x => ({
            label: x,
            value: x,
        }));
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={options} />
        );

        wrapper.find(Radio.Group).find('.ant-radio-input').at(0).simulate('change', { target: { checked: true } });

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it.skip('should pass checked value in option callback', () => {
        const options = [1, 2].map(x => ({
            label: x,
            value: x,
        }));
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={options}
                checked={true}
                selectedOption={1} />
        );

        wrapper.find(Radio.Group).find('.ant-radio-input').at(0).simulate('change', { target: { checked: true } });

        const args = onChange.mock.calls[0];
        expect(args[1]).toBeTruthy();
    });

    it.skip('should pass selected option in option callback', () => {
        const options = [1, 2].map(x => ({
            label: x,
            value: x,
        }));
        const onChange = jest.fn();

        const wrapper = mount(
            <CheckedRadioGroup
                text=''
                onChange={onChange}
                name=''
                options={options}
                checked={true}
                selectedOption={1} />
        );

        wrapper.find(Radio.Group).find('.ant-radio-input').at(0).simulate('change', { target: { checked: true } });

        const args = onChange.mock.calls[0];
        expect(args[2]).toEqual(1);
    });
});
