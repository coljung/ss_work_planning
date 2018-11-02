import i18n from 'i18next';
import React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { Modal, Button } from 'antd';
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
            <SavePlanModal onSave={jest.fn()} />
        );

        const modal = output.find(Modal).first();
        expect(modal.prop('title')).toEqual('budgetView.savePlanModal.title');

        i18nStub.restore();
    });

    it('Should have activator button', () => {
        const output = shallow(
            <SavePlanModal onSave={jest.fn()} />
        );

        expect(output.find(Button).prop('icon')).toEqual('save');
    });

    it('Should not show modal by default', () => {
        const output = shallow(
            <SavePlanModal onSave={jest.fn()} />
        );

        const modal = output.find(Modal);
        expect(modal.first().prop('visible')).toBeFalsy();
    });

    it('Should show modal when clicking the activator button', () => {
        const output = shallow(
            <SavePlanModal onSave={jest.fn()} />
        );

        expect(output.find(Modal).prop('visible')).toBeFalsy();

        output.find(Button).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();
    });

    it('Should close modal when clicking the cancel button', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} />
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
            <SavePlanModal onSave={onSave} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should close modal after saving', () => {
        const output = mount(
            <SavePlanModal onSave={jest.fn()} />
        );

        // Initial state
        expect(output.find(Modal).prop('visible')).toBeFalsy();

        // Click the open button
        output.find(Button).first().simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeFalsy();
    });

    const setResource = (key) => {
        i18nStub.withArgs(key).returns(key);
    };
});
