import React from 'react';
import renderer from 'react-test-renderer';
import NavigationUser from '../../../../app/components/common/NavigationUser';

describe('<NavigationUser />', () => {
    it.skip('should render base layout', () => {
        const app = renderer.create(
            <NavigationUser />
        );
        expect(app).toMatchSnapshot()
    });
});
