import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HeaderContent from '../../../../app/components/common/HeaderContent';

describe('<HeaderContent />', () => {
    it('should render base layout', () => {
        const wrapper = shallow(
            <HeaderContent />
        );

        expect(wrapper.render().find('svg')).to.have.lengthOf(1);
        expect(wrapper.find('h1')).to.have.lengthOf(1);
    });
});
