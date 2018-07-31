import i18n from 'i18next';
import React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { Modal, Tree, Button } from 'antd';
import FilterModal from '../../../../app/budgets/filters/FilterModal';

describe('FilterModal', () => {
    let i18nStub;

    beforeEach(() => {
        i18nStub = sinon.stub(i18n, 't');
    });

    afterEach(() => {
        i18nStub.restore();
    });

    it('Should have modal', () => {
        setResource('filterModal.title');
        setResource('filterModal.saveButton');
        setResource('filterModal.cancelButton');

        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{}}/>
        );

        const modal = output.find(Modal).first();
        expect(modal.prop('title')).toEqual('filterModal.title');
        expect(modal.prop('okText')).toEqual('filterModal.saveButton');
        expect(modal.prop('cancelText')).toEqual('filterModal.cancelButton');

        i18nStub.restore();
    });

    it('Should have activator button', () => {
        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{}} />
        );

        expect(output.find(Button).prop('icon')).toEqual('switcher');
    });

    it('Should not show modal by default', () => {
        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{}} />
        );

        const modal = output.find(Modal);
        expect(modal.first().prop('visible')).toBeFalsy();
    });

    it('Should show modal when clicking the activator button', () => {
        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{}} />
        );

        expect(output.find(Modal).prop('visible')).toBeFalsy();

        output.find(Button).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();
    });

    it('Should close modal when clicking the cancel button', () => {
        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{}} />
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
            <FilterModal
                onSave={onSave}
                filters={{ available_metrics: ['test'] }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should pass the checked items in save handle', () => {
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ available_metrics: ['test'] }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith(['test']);
    });

    it('Should pass the changed checked items in save handle', () => {
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ available_metrics: ['test1', 'test2'] }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect the first node
        output.find(Modal).find(Tree).find(Tree.TreeNode).first().find('.ant-tree-checkbox').simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith(['test2']);
    });

    it('Should close modal after saving', () => {
        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ available_metrics: ['test'] }} />
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

    it('Should disable save button when no checked items', () => {
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ available_metrics: ['test1', 'test2'] }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect nodes
        output.find(Modal).find(Tree).find(Tree.TreeNode).at(0).find('.ant-tree-checkbox').simulate('click');
        output.find(Modal).find(Tree).find(Tree.TreeNode).at(1).find('.ant-tree-checkbox').simulate('click');

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should contain a list of available metrics', () => {
        setResource('metric.test1');
        setResource('metric.test2');

        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{ available_metrics: ['test1', 'test2'] }} />
        );

        output.find(Button).first().simulate('click');

        const tree = output.find(Modal).find(Tree);
        expect(tree.prop('checkedKeys')).toContain('test1');
        expect(tree.prop('checkedKeys')).toContain('test2');

        const nodes = output.find(Modal).find(Tree).find(Tree.TreeNode);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('title')).toEqual('metric.test1');
        expect(nodes.at(1).prop('title')).toEqual('metric.test2');
    });

    it('Should contain a list of same available metrics', () => {
        setResource('metric.test1');
        setResource('metric.test2');
        setResource('metric.test3');
        setResource('metric.test4');

        let filters = { available_metrics: ['test1', 'test2'] };

        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={filters} />
        );

        output.setProps({ filters });

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Tree).find(Tree.TreeNode);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('title')).toEqual('metric.test1');
        expect(nodes.at(1).prop('title')).toEqual('metric.test2');
    });

    it('Should contain a list of changed available metrics', () => {
        setResource('metric.test1');
        setResource('metric.test2');
        setResource('metric.test3');
        setResource('metric.test4');

        let filters = { available_metrics: ['test1', 'test2'] };

        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={filters} />
        );

        filters = { available_metrics: ['test3', 'test4'] };
        output.setProps({ filters });

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Tree).find(Tree.TreeNode);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('title')).toEqual('metric.test3');
        expect(nodes.at(1).prop('title')).toEqual('metric.test4');
    });

    const setResource = (key) => {
        i18nStub.withArgs(key).returns(key);
    };
});
