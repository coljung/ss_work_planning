import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'antd';
import * as sinon from 'sinon';
import i18n from 'i18next';
import ViewPicker from '../../../app/budgets/ViewPicker';

describe('ViewPicker', () => {
    it('Should pass children in props', () => {
        const selectedTab = 'total'
        const output = shallow(
            <ViewPicker
                tab={ selectedTab }
                onTabChange={jest.fn()}
                seasonLabel="SS19">
            </ViewPicker>
        );

        const menu = output.find(Menu);
        expect(menu.prop('selectedKeys')).toEqual([selectedTab]);
    });

    it('Should contain 4 menu items', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('budgetView.totalTab').returns('budgetView.totalTab');
        i18nStub.withArgs('budgetView.womenTab').returns('budgetView.womenTab');
        i18nStub.withArgs('budgetView.menTab').returns('budgetView.menTab');

        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={jest.fn()}
                seasonLabel="SS19">
            </ViewPicker>
        );

        const menu = output.find(Menu.Item);
        expect(menu).toHaveLength(4);

        expect(menu.at(1).prop('children')).toEqual('budgetView.totalTab');
        expect(menu.at(2).prop('children')).toEqual('budgetView.womenTab');
        expect(menu.at(3).prop('children')).toEqual('budgetView.menTab');

        i18nStub.restore();
    });

    it('Should execute change tab callback', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={changeTab}
                seasonLabel="SS19">
            </ViewPicker>
        );

        output.find(Menu).prop('onClick')('women');

        expect(changeTab).toHaveBeenCalledTimes(1);
    });

    it('Should pass tab on change tab callback', () => {
        const changeTab = jest.fn();

        const output = shallow(
            <ViewPicker
                tab='total'
                onTabChange={changeTab}
                seasonLabel="SS19">
            </ViewPicker>
        );

        output.find(Menu).prop('onClick')('women');

        expect(changeTab).toBeCalledWith('women');
    });
});
