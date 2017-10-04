import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Logo from '../../../../app/components/common/Logo';

describe('<Logo />', () => {
    it('should render base layout', () => {
        const wrapper = shallow(<Logo />);
        expect(wrapper.find('svg')).to.have.lengthOf(1);
    });
});
