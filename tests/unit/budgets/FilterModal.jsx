import i18n from 'i18next';
import React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { Modal, Checkbox, Button } from 'antd';
import FilterModal from '../../../app/budgets/FilterModal';
import CheckedRadioGroup from "../../../app/components/common/CheckedRadioGroup";

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
                filters={{selectedMetrics:[], selectedPlanTypes:[]}}
                availableOptions={{availableMetrics:[], availablePlans:[]}} />
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
                filters={{selectedMetrics:[], selectedPlanTypes:[]}}
                availableOptions={{availableMetrics:[], availablePlans:[]}} />
        );

        expect(output.find(Button).prop('icon')).toEqual('switcher');
    });

    it('Should not show modal by default', () => {
        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:[], selectedPlanTypes:[]}}
                availableOptions={{availableMetrics:[], availablePlans:[]}} />
        );

        const modal = output.find(Modal);
        expect(modal.first().prop('visible')).toBeFalsy();
    });

    it('Should show modal when clicking the activator button', () => {
        const output = shallow(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:[], selectedPlanTypes:[]}}
                availableOptions={{availableMetrics:[], availablePlans:[]}} />
        );

        expect(output.find(Modal).prop('visible')).toBeFalsy();

        output.find(Button).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();
    });

    it('Should close modal when clicking the cancel button', () => {
        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:[], selectedPlanTypes:[]}}
                availableOptions={{availableMetrics:[], availablePlans:[]}} />
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
        const metricFilters = ['Sales'];
        const planFilters = ['dsrp'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should pass the checked items in save handle', () => {
        const metricFilters = ['Sales'];
        const planFilters = ['dsrp'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith( {selectedMetrics:['Sales'], selectedPlanTypes:['dsrp']});
    });

    it('Should pass the changed checked items in save handle', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );
        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect the first node
        output.find(Modal).find(Checkbox.Group).find('.ant-checkbox-input').first().simulate('change', { target: { checked: false } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({"selectedMetrics": ["Cogs"], "selectedPlanTypes": ["dsrp"]});
    });

    it('Should pass all items after checking all', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );


        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the Select All option
        output.find(Modal).find('.ant-checkbox-input').first().simulate('change', { target: { checked: true } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({"selectedMetrics": ["Sales", "Cogs"], "selectedPlanTypes": ["dsrp"]});
    });

    it('Should disable apply button after checking none', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );
        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the Select All option
        output.find(Modal).find('.ant-checkbox-input').first().simulate('change', { target: { checked: false } });

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should close modal after saving', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
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

    it('Should disable save button when no checked Metrics', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect nodes
        output.find(Modal).find(Checkbox.Group).at(0).find('.ant-checkbox-input').at(0).simulate('change', { target: { checked: false } });
        output.find(Modal).find(Checkbox.Group).at(0).find('.ant-checkbox-input').at(1).simulate('change', { target: { checked: false } });

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should disable save button when no checked plans', () => {
        const metricFilters = ['Sales'];
        const planFilters = ['dsrp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:['dsrp']}} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect nodes
        output.find(Modal).find(Checkbox).at(1).find('.ant-checkbox-input').at(0).simulate('change', { target: { checked: false } });

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should contain a list of available metrics', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:['dsrp']}} />
        );

        output.find(Button).first().simulate('click');

        const tree = output.find(Modal).find(Checkbox.Group).at(0);
        expect(tree.prop('value')).toContain('Sales');
        expect(tree.prop('value')).toContain('Cogs');

        const nodes = tree.find(Checkbox);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('value')).toEqual('Sales');
        expect(nodes.at(1).prop('value')).toEqual('Cogs');
    });

    it('Should contain a list of available plans', () => {
        setResource('plan.dsrp');
        setResource('plan.wp');
        setResource('year.1');
        setResource('year.2');
        setResource('year.3');
        setResource('year.5');
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp','wp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));;

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:['dsrp','wp']}} />
        );

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(CheckedRadioGroup);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('text')).toEqual('plan.dsrp');
        expect(nodes.at(1).prop('text')).toEqual('plan.wp');
    });

    it('Should contain a list of same available metrics', () => {
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));;

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );
        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans:['dsrp']} });

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Checkbox.Group).at(0).find(Checkbox);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('value')).toEqual('Sales');
        expect(nodes.at(1).prop('value')).toEqual('Cogs');
    });

    it('Should contain a list of same available plans', () => {
        setResource('plan.dsrp');
        setResource('year.1');
        setResource('year.2');
        setResource('year.3');
        setResource('year.5');
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));;

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:planFilters}} />
        );
        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans:['dsrp']} });

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(CheckedRadioGroup);
        expect(nodes).toHaveLength(1);

        expect(nodes.at(0).prop('text')).toEqual('plan.dsrp');
    });

    it('Should contain a list of changed available metrics', () => {

        setResource('plan.dsrp');
        setResource('year.1');
        setResource('year.2');
        setResource('year.3');
        setResource('year.5');
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));;

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:['dsrp']}} />
        );

        const filters = ['test3', 'test4'];
        output.setProps({ availableOptions: { availableMetrics: filters , availablePlans:['dsrp']} });
        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Checkbox.Group).at(0).find(Checkbox);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('value')).toEqual('test3');
        expect(nodes.at(1).prop('value')).toEqual('test4');
    });

    it('Should contain a list of changed available plans', () => {

        setResource('plan.dsrp');
        setResource('plan.test3');
        setResource('plan.test4');
        setResource('year.1');
        setResource('year.2');
        setResource('year.3');
        setResource('year.5');
        const metricFilters = ['Sales', 'Cogs'];
        const planFilters = ['dsrp'].map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));;

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{selectedMetrics:metricFilters, selectedPlanTypes:planFilters}}
                availableOptions={{availableMetrics:metricFilters, availablePlans:['dsrp']}} />
        );

        const changesPlanFilters = ['test3', 'test4'];
        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans:changesPlanFilters} });
        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(CheckedRadioGroup);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('text')).toEqual('plan.test3');
        expect(nodes.at(1).prop('text')).toEqual('plan.test4');
    });

    const setResource = (key) => {
        i18nStub.withArgs(key).returns(key);
    };
});
