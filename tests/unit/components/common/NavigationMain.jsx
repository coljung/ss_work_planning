import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Menu } from 'antd';
import NavigationMain from '../../../../app/components/common/NavigationMain';

const Item = Menu.Item;
let sandbox;
let props;

describe('<NavigationMain />', () => {
    before(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        props = {
            pathname: '',
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render base layout', () => {
        const wrapper = shallow(<NavigationMain {...props} />);

        const items = wrapper.find(Item);
        expect(items).to.have.lengthOf(4);
        expect(wrapper.find(Menu)).to.have.lengthOf(1);
    });

    it('simulate click event', () => {
        const wrapper = shallow(<NavigationMain {...props} />);

        expect(wrapper.state('current')).to.equal('');
        wrapper.find(Menu).simulate('click', { key: '/admin' });
        expect(wrapper.state('current')).to.equal('/admin');
    });
});
