import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../../../app/components/App';
import HeaderContent from '../../../app/components/common/HeaderContent';

describe("<App />", () => {
	let props;

	beforeEach(() => {
        props = {
            location: { pathname: '' },
        };
    });

	it('should render the mulitple components', () => {
		const wrapper = shallow(<App {...props} ><div className="test" /></App>);
		expect(wrapper.find(HeaderContent)).to.have.lengthOf(1);
		expect(wrapper.find("main")).to.have.lengthOf(1);
	});

});