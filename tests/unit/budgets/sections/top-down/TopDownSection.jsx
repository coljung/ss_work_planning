import React from 'react';
import { shallow } from 'enzyme';
import TopDownSection from '../../../../../app/budgets/sections/top-down/TopDownSection';
import * as sinon from 'sinon';
import i18n from 'i18next';
import { Tabs } from 'antd';

describe('TopDownSection', () => {
    it('Should render base layout', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetView.totalTab').returns('budgetView.totalTab');
        i18nStub.withArgs('budgetView.womenTab').returns('budgetView.womenTab');
        i18nStub.withArgs('budgetView.menTab').returns('budgetView.menTab');

        const output = shallow(
            <TopDownSection
                changeTab={jest.fn()}
                activeKey='total'
                budget='FW19'
                data={[]}
                tab='total'
                version='1' />
        );

        const panes = output.find(Tabs.TabPane);
        expect(panes).toHaveLength(3);
        expect(panes.at(0).prop('tab')).toEqual('budgetView.totalTab');
        expect(panes.at(1).prop('tab')).toEqual('budgetView.womenTab');
        expect(panes.at(2).prop('tab')).toEqual('budgetView.menTab');

        i18nStub.restore();
    });

    it('Should call changeTab callback', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <TopDownSection
                changeTab={changeTab}
                activeKey='total'
                budget='FW19'
                data={[]}
                tab='total'
                version='1' />
        );

        output.find(Tabs).prop('onChange')('women');

        expect(changeTab).toHaveBeenCalledTimes(1);
        expect(changeTab).toBeCalledWith('women');
    });

    it('Should change active tab on change callback', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <TopDownSection
                changeTab={changeTab}
                activeKey='total'
                budget='FW19'
                data={[]}
                tab='total'
                version='1' />
        );

        expect(output.state().activeTab).toEqual('total');

        output.find(Tabs).prop('onChange')('women');

        expect(output.state().total).toBeFalsy();
        expect(output.state().activeTab).toEqual('women');
        expect(output.state().women).toBeTruthy();
    });

    it('Should change active tab for women on props change', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <TopDownSection
                changeTab={changeTab}
                activeKey='total'
                budget='FW19'
                data={[]}
                tab='total'
                version='1' />
        );

        expect(output.state().activeTab).toEqual('total');

        output.setProps({ tab: 'women' });

        expect(output.state().total).toBeFalsy();
        expect(output.state().activeTab).toEqual('women');
        expect(output.state().women).toBeTruthy();
    });

    it('Should change active tab for men on props change', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <TopDownSection
                changeTab={changeTab}
                activeKey='total'
                budget='FW19'
                data={[]}
                tab='total'
                version='1' />
        );

        expect(output.state().activeTab).toEqual('total');

        output.setProps({ tab: 'men' });

        expect(output.state().total).toBeFalsy();
        expect(output.state().activeTab).toEqual('men');
        expect(output.state().men).toBeTruthy();
    });

    it('Should not change active tab on other props change', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <TopDownSection
                changeTab={changeTab}
                activeKey='total'
                budget='FW19'
                data={[]}
                tab='total'
                version='1' />
        );

        expect(output.state().activeTab).toEqual('total');

        output.setProps({ test: true });

        expect(output.state().activeTab).toEqual('total');
    });
});
