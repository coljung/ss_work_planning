import i18n from 'i18next';
import React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { Modal, Button, Radio } from 'antd';
import SavePlanModal from '../../../app/budgets/SavePlanModal';

describe('SavePlanModal', () => {
    let i18nStub;

    beforeEach(() => {
        i18nStub = sinon.stub(i18n, 't');
    });

    afterEach(() => {
        i18nStub.restore();
    });

    it('Should have modal', () => {
        setResource('budgetView.savePlanModal.title');

        const output = shallow(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        const modal = output.find(Modal).first();
        expect(modal.prop('title')).toEqual('budgetView.savePlanModal.title');

        i18nStub.restore();
    });

    it('Should have activator button', () => {
        const output = shallow(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        expect(output.find(Button).prop('icon')).toEqual('save');
    });

    it('Should not show modal by default', () => {
        const output = shallow(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        const modal = output.find(Modal);
        expect(modal.first().prop('visible')).toBeFalsy();
    });

    it('Should show modal when clicking the activator button', () => {
        const output = shallow(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        expect(output.find(Modal).prop('visible')).toBeFalsy();

        output.find(Button).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();
    });

    it('Should close modal when clicking the cancel button', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        // Initial state
        expect(output.find(Modal).prop('visible')).toBeFalsy();

        // Click the open button
        output.find(Button).first().simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();

        // Click the cancel button
        output.find(Modal).find(Button).first().simulate('click');
        expect(output.find(Modal).prop('visible')).toBeFalsy();
    });

    it('Should call save handle when clicking ok button', () => {
        const onSave = jest.fn();

        const output = mount(
            <SavePlanModal onSave={onSave} existingPlans={[]} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select the first radio
        output.find(Radio.Group).find('.ant-radio-button-input').at(0).simulate('change', { target: { checked: true } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should close modal after saving', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        // Initial state
        expect(output.find(Modal).prop('visible')).toBeFalsy();

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select the first radio
        output.find(Radio.Group).find('.ant-radio-button-input').at(0).simulate('change', { target: { checked: true } });

        expect(output.find(Modal).prop('visible')).toBeTruthy();

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeFalsy();
    });

    it('Should pass the selection in save handle', () => {
        const onSave = jest.fn();

        const output = mount(
            <SavePlanModal onSave={onSave} existingPlans={[]} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select the first radio
        output.find(Radio.Group).find('.ant-radio-button-input').at(0).simulate('change', { target: { checked: true } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith('op');
    });

    it('Should disable save button when no selection', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should not show error message when selecting a plan that does not exist', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} existingPlans={['wp']} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select the first radio
        output.find(Radio.Group).find('.ant-radio-button-input').at(0).simulate('change', { target: { checked: true } });

        expect(output.find(Modal).find('.note').exists()).toBeFalsy();
    });

    it('Should show error message when selecting an existing plan', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} existingPlans={['op']} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select the first radio
        output.find(Radio.Group).find('.ant-radio-button-input').at(0).simulate('change', { target: { checked: true } });

        expect(output.find(Modal).find('.note').exists()).toBeTruthy();
    });

    it('Should contain a list of available selections', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} existingPlans={[]} />
        );

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Radio.Group).find(Radio.Button);
        expect(nodes).toHaveLength(4);

        expect(nodes.at(0).prop('value')).toEqual('op');
        expect(nodes.at(1).prop('value')).toEqual('rp1');
        expect(nodes.at(2).prop('value')).toEqual('rp2');
        expect(nodes.at(3).prop('value')).toEqual('rp3');
    });

    const setResource = (key) => {
        i18nStub.withArgs(key).returns(key);
    };
});
