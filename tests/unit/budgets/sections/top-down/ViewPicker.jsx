import React from 'react';
import { shallow } from 'enzyme';
import { Tabs } from 'antd';
import * as sinon from 'sinon';
import i18n from 'i18next';
import ViewPicker from '../../../../../app/budgets/sections/top-down/ViewPicker';

describe('ViewPicker', () => {
    it('Should pass children in props', () => {
        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={jest.fn()}>
            </ViewPicker>
        );

        const tabs = output.find(Tabs);
        expect(tabs.prop('activeKey')).toEqual('total');
    });

    it('Should contain 3 tab panels', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetView.totalTab').returns('budgetView.totalTab');
        i18nStub.withArgs('budgetView.womenTab').returns('budgetView.womenTab');
        i18nStub.withArgs('budgetView.menTab').returns('budgetView.menTab');

        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={jest.fn()}>
            </ViewPicker>
        );

        const tabs = output.find(Tabs.TabPane);
        expect(tabs).toHaveLength(3);

        expect(tabs.at(0).prop('tab')).toEqual('budgetView.totalTab');
        expect(tabs.at(1).prop('tab')).toEqual('budgetView.womenTab');
        expect(tabs.at(2).prop('tab')).toEqual('budgetView.menTab');

        i18nStub.restore();
    });

    it('Should execute change tab callback', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={changeTab}>
            </ViewPicker>
        );

        output.find(Tabs).prop('onChange')('women');

        expect(changeTab).toHaveBeenCalledTimes(1);
    });

    it('Should pass tab on change tab callback', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={changeTab}>
            </ViewPicker>
        );

        output.find(Tabs).prop('onChange')('women');

        expect(changeTab).toBeCalledWith('women');
    });
});
