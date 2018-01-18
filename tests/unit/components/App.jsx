import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import App from '../../../app/components/App';
import HeaderContent from '../../../app/components/common/HeaderContent';

describe('App', () => {
    it('should render correctly', () => {
        const testRenderer = TestRenderer.create(
            <App />
        );
        // const wrapper = shallow(
        //     <App />
        // );
        expect(testRenderer).toMatchSnapshot()
	});
})
