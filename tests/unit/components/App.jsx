import i18n from 'i18next';

jest.mock('../../../app/components/customNavigation/CustomNavigation', () => 'CustomNavigation');
jest.mock('../../../app/notifications/NotificationManager', () => 'NotificationManager12345643');

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import App from '../../../app/components/App';

let props;

describe('App', () => {
    beforeAll(() => {
        props = { location: { pathname: 'pathname' } };
    });

    it('should render correctly', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('appTitle').returns('Merchandise Planning Tool');

        const app = renderer.create(
            <App location={{ pathname: 'pathname'}} />
        );
        expect(app).toMatchSnapshot();

        i18nStub.restore();
	});

    it('should handle toggle', () => {
        const clock = sinon.useFakeTimers();
        const wrapper = shallow(<App {...props} />);
        expect(wrapper.state('collapsed')).toEqual(true);
        wrapper.instance().toggle();
        expect(wrapper.state('collapsed')).toEqual(false);
        clock.tick(80000);
        expect(wrapper.state('collapsed')).toEqual(true);
        clock.restore();
    });
});
