import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Dropdown, Menu } from 'antd';
import BudgetVersionMenu from '../../../../app/budgets/components/BudgetVersionMenu';
import * as sinon from 'sinon';

describe('<BudgetVersionMenu />', () => {
    it.only('should render base layout', () => {
        const wrapper = shallow(
            <BudgetVersionMenu versions={[]} />
        );

        const dropdown = wrapper.find(Dropdown).first();
        //         console.log(wrapper.html());
        //         console.log(dropdown);
        // wrapper.find(dropdown).simulate('mouseenter');
        expect(dropdown).to.have.lengthOf(1);
    });

    it('should render base layout with items', () => {
        const onVersionClick = sinon.spy();
        const versions = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];

        const wrapper = mount(
            <BudgetVersionMenu versions={versions} />
        );


        const menu = wrapper.find(Menu).first();
        expect(menu.find(Menu.Item)).to.have.lengthOf(2);
    });

    it('should render base layout with correct items', () => {
        const versions = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];

        const wrapper = mount(
            <BudgetVersionMenu currentSeason='SS' versions={versions} />
        );

        const menu = wrapper.find(Menu).first();
        expect(menu.find(Menu.Item).at(0).text()).to.equal('SS - Item 1');
        expect(menu.find(Menu.Item).at(1).text()).to.equal('SS - Item 2');
    });

    it('should simulate click event', () => {
        const onVersionClick = sinon.spy();
        const versions = [
            { id: 1, name: 'Item 1' },
        ];

        const wrapper = shallow(
            <BudgetVersionMenu versions={versions} handleClick={onVersionClick} />
        );

        wrapper.find(Menu).simulate('click', { key: versions[0].key });
        expect(onVersionClick.called).to.equal(true);
    });
});
