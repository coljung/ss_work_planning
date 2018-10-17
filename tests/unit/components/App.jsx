import i18n from 'i18next';

jest.mock('../../../app/components/customNavigation/CustomNavigation', () => 'CustomNavigation');
jest.mock('../../../app/notifications/NotificationManager', () => 'NotificationManager12345643');

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../app/ApiClient';
import clientMiddleware from '../../../app/middleware/clientMiddleware';
import App from '../../../app/components/App';
import CustomNavigation from '../../../app/components/customNavigation/CustomNavigation';

let props;

function setup(state = {}, props = {}) {
    const initialState = {
        userReducer: {
            user: { name: 'Foo Bar' },
        },
        ...state
    };

    const initialProps = {
        location: {},
        children: [],
        me: jest.fn(),
        user: { name: 'Foo Bars' },
        ...props,
    };

    const client = new ApiClient();
    const middlewares = [thunk, clientMiddleware(client)];

    let store = configureMockStore(middlewares)(initialState);

    return { initialProps, store };
}

describe('App', () => {
    let mockStore;

    beforeAll(() => {
        props = { location: { pathname: 'pathname' } };
    });

    it('should render correctly', () => {
        const i18nStub = sinon.stub(i18n, 't');
        i18nStub.withArgs('appTitle').returns('Merchandise Planning Tool');

        const { initialProps, store } = setup();

        const app = renderer.create(
            <App
                location={{ pathname: 'pathname'}}
                store={store}
                {...initialProps} />
        );
        expect(app).toMatchSnapshot();

        i18nStub.restore();
	});
});
