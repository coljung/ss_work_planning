import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HeaderContent from '../../../../app/components/common/HeaderContent';

let props;

describe('<HeaderContent />', () => {
    beforeEach(() => {
        props = { };
    });

    it('should render base layout', () => {
        const wrapper = shallow(<HeaderContent {...props} />);
        expect(wrapper.find('Logo')).to.have.lengthOf(1);
        expect(wrapper.find('NavigationUser')).to.have.lengthOf(1);
        expect(wrapper.find('h1')).to.have.lengthOf(1);
    });
});
