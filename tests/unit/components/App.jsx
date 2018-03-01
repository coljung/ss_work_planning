jest.mock('../../../app/components/common/NavigationMain', () => 'NavigationMain');
jest.mock('../../../app/notifications/NotificationManager', () => 'NotificationManager12345643');

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../../../app/components/App';
import HeaderContent from '../../../app/components/common/HeaderContent';

describe('App', () => {
    it('should render correctly', () => {
        const app = renderer.create(
            <App location={{ pathname: 'pathname' }} />,
        );
        expect(app).toMatchSnapshot();
    });
});
