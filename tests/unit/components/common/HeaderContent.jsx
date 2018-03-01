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
        // NavigationUser has been remove because we dont have a logout at the moment
        // expect(wrapper.find('NavigationUser')).to.have.lengthOf(1);

        expect(wrapper.render().find('svg')).to.have.lengthOf(1);
        expect(wrapper.find('h1')).to.have.lengthOf(1);
    });
});
