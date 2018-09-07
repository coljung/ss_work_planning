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
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('Should pass the checked metrics in save handle', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({ selectedMetrics: ['metric1'], selectedPlanTypes: [{ plan: 'plan1', numberOfHistoricalYears: 5 }] });
    });

    it('Should pass the changed checked metrics in save handle', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');
        setResource('filterModal.filters.metrics.metric2');

        const metricFilters = ['metric1', 'metric2'];
        const planFilters = ['plan1'];

        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );
        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect the first node
        output.find(Modal).find(Checkbox.Group).find('.ant-checkbox-input').first().simulate('change', { target: { checked: false } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({ selectedMetrics: ['metric2'], selectedPlanTypes: [{ plan: 'plan1', numberOfHistoricalYears: 5 }] });
    });

    it('Should pass the changed checked plans in save handle', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.plans.plan2');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1', 'plan2'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect the first plan
        output.find(CheckedRadioGroup).at(0).find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: false } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({ selectedMetrics: ['metric1'], selectedPlanTypes: [{ plan: 'plan2', numberOfHistoricalYears: 5 }] });
    });

    it('Should pass the added checked plan in save handle', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.plans.plan2');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1', 'plan2'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions('plan1') }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect the first plan
        output.find(CheckedRadioGroup).at(1).find(Checkbox).find('.ant-checkbox-input').simulate('change', { target: { checked: true } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({ selectedMetrics: ['metric1'], selectedPlanTypes: [{ plan: 'plan1', numberOfHistoricalYears: 5 }, { plan: 'plan2', numberOfHistoricalYears: 5 }] });
    });

    it('Should pass all items after checking all', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');
        setResource('filterModal.filters.metrics.metric2');

        const metricFilters = ['metric1', 'metric2'];
        const planFilters = ['plan1'];
        const onSave = jest.fn();

        const output = mount(
            <FilterModal
                onSave={onSave}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );


        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the Select All option
        output.find(Modal).find('.ant-checkbox-input').first().simulate('change', { target: { checked: true } });

        // Click the save button
        output.find(Modal).find(Button).at(1).simulate('click');

        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toBeCalledWith({ selectedMetrics: ['metric1', 'metric2'], selectedPlanTypes: [{ plan: 'plan1', numberOfHistoricalYears: 5 }] });
    });

    it('Should disable apply button after checking none', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );
        // Click the open button
        output.find(Button).first().simulate('click');

        // Click the Select All option
        output.find(Modal).find('.ant-checkbox-input').first().simulate('change', { target: { checked: false } });

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should close modal after saving', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
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
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect nodes
        output.find(Modal).find(Checkbox.Group).at(0).find('.ant-checkbox-input').at(0).simulate('change', { target: { checked: false } });

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should disable save button when no checked plans', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        // Click the open button
        output.find(Button).first().simulate('click');

        // Unselect nodes
        output.find(Modal).find(Checkbox).at(1).find('.ant-checkbox-input').at(0).simulate('change', { target: { checked: false } });

        expect(output.find(Modal).find(Button).at(1).prop('disabled')).toBeTruthy();
    });

    it('Should contain a list of available metrics', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');
        setResource('filterModal.filters.metrics.metric2');

        const metricFilters = ['metric1', 'metric2'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Checkbox.Group).find(Checkbox);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('value')).toEqual('metric1');
        expect(nodes.at(1).prop('value')).toEqual('metric2');
    });

    it('Should contain a list of available plans', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.plans.plan2');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1', 'plan2'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(CheckedRadioGroup);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('text')).toEqual('filterModal.filters.plans.plan1');
        expect(nodes.at(1).prop('text')).toEqual('filterModal.filters.plans.plan2');
    });

    it('Should contain a list of same available metrics', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');
        setResource('filterModal.filters.metrics.metric2');

        const metricFilters = ['metric1', 'metric2'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans: planFilters }});

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Checkbox.Group).at(0).find(Checkbox);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('value')).toEqual('metric1');
        expect(nodes.at(1).prop('value')).toEqual('metric2');
    });

    it('Should contain a list of same available plans', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.plans.plan2');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        const planFilters = ['plan1', 'plan2'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );
        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans: planFilters }});

        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(CheckedRadioGroup);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('text')).toEqual('filterModal.filters.plans.plan1');
        expect(nodes.at(1).prop('text')).toEqual('filterModal.filters.plans.plan2');
    });

    it('Should contain a list of changed available metrics', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.metrics.metric1');
        setResource('filterModal.filters.metrics.metric2');
        setResource('filterModal.filters.metrics.metric3');

        let metricFilters = ['metric1'];
        const planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        metricFilters = ['metric2', 'metric3'];
        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans: planFilters}});
        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(Checkbox.Group).at(0).find(Checkbox);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('value')).toEqual('metric2');
        expect(nodes.at(1).prop('value')).toEqual('metric3');
    });

    it('Should contain a list of changed available plans', () => {
        setResource('filterModal.filters.plans.plan1');
        setResource('filterModal.filters.plans.plan2');
        setResource('filterModal.filters.plans.plan3');
        setResource('filterModal.filters.metrics.metric1');

        const metricFilters = ['metric1'];
        let planFilters = ['plan1'];

        const output = mount(
            <FilterModal
                onSave={jest.fn()}
                filters={{ selectedMetrics: metricFilters, selectedPlanTypes: createOptions(...planFilters) }}
                availableOptions={{ availableMetrics: metricFilters, availablePlans: planFilters }} />
        );

        planFilters = ['plan2', 'plan3'];

        output.setProps({ availableOptions: { availableMetrics: metricFilters , availablePlans: planFilters }});
        output.find(Button).first().simulate('click');

        const nodes = output.find(Modal).find(CheckedRadioGroup);
        expect(nodes).toHaveLength(2);

        expect(nodes.at(0).prop('text')).toEqual('filterModal.filters.plans.plan2');
        expect(nodes.at(1).prop('text')).toEqual('filterModal.filters.plans.plan3');
    });

    const setResource = (key) => {
        i18nStub.withArgs(key).returns(key);
    };

    function createOptions(...args) {
        return args.map(x => ({
            plan: x,
            numberOfHistoricalYears: 5,
        }));
    }
});
