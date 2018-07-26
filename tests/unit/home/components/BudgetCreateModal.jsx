import i18n from 'i18next';
import React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { Button, Modal, Select } from 'antd';
import BudgetCreateModal from '../../../../app/home/components/BudgetCreateModal';

describe('BudgetCreateModal', () => {
    it('Should have modal', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('createBudgetModal.title').returns('createBudgetModal.title');
        i18nStub.withArgs('createBudgetModal.saveButton').returns('createBudgetModal.saveButton');
        i18nStub.withArgs('createBudgetModal.cancelButton').returns('createBudgetModal.cancelButton');

        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[]}/>
        );

        const modal = output.find(Modal).first();
        expect(modal.prop('title')).toEqual('createBudgetModal.title');
        expect(modal.prop('okText')).toEqual('createBudgetModal.saveButton');
        expect(modal.prop('cancelText')).toEqual('createBudgetModal.cancelButton');

        i18nStub.restore();
    });

    it('Should have activator button', () => {
        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[]}/>
        );

        expect(output.find(Button).prop('icon')).toEqual('file');
    });

    it('Should disable activator button when disabled from props', () => {
        const output = mount(
            <BudgetCreateModal
                onSave={jest.fn()}
                disabled={true}
                seasons={[]}/>
        );

        expect(output.find(Button).prop('disabled')).toBeTruthy();
    });

    it('Should not show modal by default', () => {
        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[]}/>
        );

        const modal = output.find(Modal);
        expect(modal.first().prop('visible')).toBeFalsy();
    });

    it('Should show modal when clicking the activator button', () => {
        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[]}/>
        );

        expect(output.find(Modal).prop('visible')).toBeFalsy();

        output.find(Button).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();
    });

    it('Should close modal when clicking the cancel button', () => {
        const output = mount(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[]} />
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
            <BudgetCreateModal
                onSave={onSave}
                seasons={[{ name: 'FW19', season: 'FW', year: 2019 }]} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select a value to enable button
        output.find(Modal).find(Select).prop('onChange')('FW-2019');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should pass the selected item in save handle', () => {
        const onSave = jest.fn();

        const output = mount(
            <BudgetCreateModal
                onSave={onSave}
                seasons={[{ name: 'FW19', season: 'FW', year: 2019 }]} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Select a value to enable button
        output.find(Modal).find(Select).prop('onChange')('FW-2019');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith('FW', '2019');
    });

    it('Should close modal after saving', () => {
        const output = mount(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[{ name: 'FW19', season: 'FW', year: 2019 }]} />
        );

        // Initial state
        expect(output.find(Modal).prop('visible')).toBeFalsy();

        // Click the open button
        output.find(Button).first().simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();

        // Select a value to enable button
        output.find(Modal).find(Select).prop('onChange')('FW-2019');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeFalsy();
    });

    it('Should disable save button when no selected item', () => {
        const onSave = jest.fn();

        const output = mount(
            <BudgetCreateModal
                onSave={onSave}
                seasons={[{ name: 'FW19', season: 'FW', year: 2019 }]} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should contain a list of available seasons', () => {
        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[
                    { name: 'FW19', season: 'FW', year: 2019 },
                    { name: 'FW20', season: 'FW', year: 2020 },
                ]} />
        );

        output.find(Button).first().simulate('click');

        const options = output.find(Modal).find(Select).find(Select.Option);
        expect(options).toHaveLength(2);

        expect(options.at(0).prop('value')).toEqual('FW-2019');
        expect(options.at(1).prop('value')).toEqual('FW-2020');
    });

    it('Should contain a list of changed available seasons', () => {
        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[
                    { name: 'FW19', season: 'FW', year: 2019 },
                    { name: 'FW20', season: 'FW', year: 2020 },
                ]} />
        );

        const seasons = [
            { name: 'FW21', season: 'FW', year: 2021 },
            { name: 'FW22', season: 'FW', year: 2022 },
        ];

        output.setProps({ seasons });

        output.find(Button).first().simulate('click');

        const options = output.find(Modal).find(Select).find(Select.Option);
        expect(options).toHaveLength(2);

        expect(options.at(0).prop('value')).toEqual('FW-2021');
        expect(options.at(1).prop('value')).toEqual('FW-2022');
    });

    it('Should not set seasons on other props change', () => {
        const output = shallow(
            <BudgetCreateModal
                onSave={jest.fn()}
                seasons={[
                    { name: 'FW19', season: 'FW', year: 2019 },
                    { name: 'FW20', season: 'FW', year: 2020 },
                ]} />
        );

        output.setProps({ test: true });

        output.find(Button).first().simulate('click');

        const options = output.find(Modal).find(Select).find(Select.Option);
        expect(options).toHaveLength(2);

        expect(options.at(0).prop('value')).toEqual('FW-2019');
        expect(options.at(1).prop('value')).toEqual('FW-2020');
    });
});
