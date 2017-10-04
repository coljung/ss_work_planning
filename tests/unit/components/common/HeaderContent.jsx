import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HeaderContent from '../../../../app/components/common/HeaderContent';
import NavigationUser from '../../../../app/components/common/NavigationUser';

let props;

describe('<HeaderContent />', () => {
    beforeEach(() => {
        props = { onStoreSelectClick: Function };
    });

    it('should render base layout', () => {
        const wrapper = shallow(<HeaderContent {...props} />);
        expect(wrapper.find(NavigationUser)).to.have.lengthOf(1);
    });
});
