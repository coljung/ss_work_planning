import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Menu } from 'antd';
import NavigationUser from '../../../../app/components/common/NavigationUser';

const Item = Menu.Item;
let sandbox;

describe('<NavigationUser />', () => {
    before(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render base layout', () => {
        const wrapper = shallow(<NavigationUser />);

        const items = wrapper.find(Item);
        expect(items).to.have.lengthOf(1);
        expect(wrapper.find(Menu)).to.have.lengthOf(1);
    });

    it('simulate click event', () => {
        const wrapper = shallow(<NavigationUser />);

        expect(wrapper.state('current')).to.equal('setting:1');
        wrapper.find(Menu).simulate('click', { key: 'setting:1' });
    });
});
