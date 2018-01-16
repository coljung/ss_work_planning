import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../../../app/components/App';
import HeaderContent from '../../../app/components/common/HeaderContent';

describe('App', () => {
	it('should render correctly', () => {
		const tree = renderer.create(
			<App />
		)
		expect(tree).toMatchSnapshot()
	})
})
