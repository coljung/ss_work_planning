import i18n from 'i18next';
import React from 'react';
import * as sinon from 'sinon';
import { shallow } from 'enzyme';
import { Modal } from 'antd';
import { Link, Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import PreviousBudgetsModal from '../../../app/home/PreviousBudgetsModal';

describe('PreviousBudgetsModal', () => {
    it('Should have modal', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetListModal.title').returns('budgetListModal.title');

        const output = shallow(
            <PreviousBudgetsModal budgets={[]} />
        );

        const modal = output.find(Modal).first();
        expect(modal.prop('title')).toEqual('budgetListModal.title');

        i18nStub.restore();
    });

    it('Should have activator button', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetListModal.link').returns('budgetListModal.link');

        const output = mount(
            <PreviousBudgetsModal budgets={[]} />
        );

        expect(output.find(Link).text()).toEqual('budgetListModal.link');

        i18nStub.restore();
    });

    it('Should not show modal by default', () => {
        const output = shallow(
            <PreviousBudgetsModal budgets={[]} />
        );

        const modal = output.find(Modal);
        expect(modal.first().prop('visible')).toBeFalsy();
    });

    it('Should show modal when clicking the activator button', () => {
        const output = shallow(
            <PreviousBudgetsModal budgets={[]} />
        );

        expect(output.find(Modal).prop('visible')).toBeFalsy();

        output.find(Link).simulate('click');
        expect(output.find(Modal).prop('visible')).toBeTruthy();
    });

    it('Should close modal when clicking the cancel button', () => {
        const Page = () => (
            <PreviousBudgetsModal budgets={[]} />
        );

        const container = mount(
            <Router history={ createMemoryHistory() }>
                <Route path="/" component={Page} />
            </Router>
        );

        // Initial state
        expect(container.find(Modal).prop('visible')).toBeFalsy();

        // Click the open button
        container.find(Link).simulate('click');
        expect(container.find(Modal).prop('visible')).toBeTruthy();

        // Click the cancel button
        container.find(Modal).find('.ant-modal-close').first().simulate('click');
        expect(container.find(Modal).prop('visible')).toBeFalsy();
    });

    it('Should contain a list of budgets', () => {
        const budgets = [
            { id: 1, season: 'FW', year: 2021},
            { id: 2, season: 'FW', year: 2020},
            { id: 3, season: 'FW', year: 2019},
        ];

        const output = shallow(
            <PreviousBudgetsModal budgets={budgets} />
        );

        output.find(Link).first().simulate('click');

        const ul = output.find(Modal).find('ul');
        expect(ul).toHaveLength(1);
        expect(ul.find('li')).toHaveLength(3);
    });

    it('Should contain a list of changed budgets', () => {
        const output = shallow(
            <PreviousBudgetsModal budgets={[
                { id: 1, season: 'FW', year: 2021},
                { id: 2, season: 'FW', year: 2020},
                { id: 3, season: 'FW', year: 2019},
            ]} />
        );

        const budgets = [
            { id: 4, season: 'FW', year: 2023},
            { id: 5, season: 'FW', year: 2022},
        ];

        output.setProps({ budgets });

        output.find(Link).first().simulate('click');

        const ul = output.find(Modal).find('ul');
        expect(ul).toHaveLength(1);
        expect(ul.find('li')).toHaveLength(2);
    });

    it('Should not set budgets on other props change', () => {
        const output = shallow(
            <PreviousBudgetsModal budgets={[
                { id: 1, season: 'FW', year: 2021},
                { id: 2, season: 'FW', year: 2020},
                { id: 3, season: 'FW', year: 2019},
            ]} />
        );

        output.setProps({ test: true });

        output.find(Link).first().simulate('click');

        const ul = output.find(Modal).find('ul');
        expect(ul).toHaveLength(1);
        expect(ul.find('li')).toHaveLength(3);
    });

    it('Should have links to budgets', () => {
        const budgets = [
            { id: 1, season: 'FW', year: 2019},
        ];

        const output = shallow(
            <PreviousBudgetsModal budgets={budgets} />
        );

        output.find(Link).first().simulate('click');

        const ul = output.find(Modal).find('ul');
        expect(ul.find(Link).prop('to')).toContain('/FW2019/1/top-down/total');
    });
});
