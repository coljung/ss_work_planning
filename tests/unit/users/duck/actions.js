import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../../app/ApiClient';
import clientMiddleware from '../../../../app/middleware/clientMiddleware';
import * as actions from '../../../../app/user/duck/actions';
import * as types from '../../../../app/user/duck/types';
import {
    authenticate as authenticateOperation,
    logout as logoutOperation,
    me as meOperation,
} from '../../../../app/user/duck/operations';

const client = new ApiClient();
const middlewares = [thunk, clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('Users action creators', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Should authenticate', () => {
        const expectedAction = {
            types: [types.LOGIN_REQUEST, types.LOGIN_SUCCEED, types.LOGIN_FAILED],
            promise: authenticateOperation
        };

        expect(actions.authenticate()).toEqual(expectedAction);
    });

    it('Should logout', () => {
        const expectedAction = {
            types: [types.LOGOUT_REQUEST, types.LOGOUT_SUCCESS, types.LOGOUT_FAILED],
            promise: logoutOperation
        };

        expect(actions.logout()).toEqual(expectedAction);
    });

    it('Should get me request', async () => {
        nock(UI_PLANNING_HOST)
            .get('/auth/users/me')
            .query({ scopes: 'ms-planning' })
            .reply(200, { user: {} });

        const expectedActions = [
            {type: types.USER_REQUEST},
            {result: { user: {} }, type: types.USER_SUCCESS}
        ];

        const store = mockStore({});

        await store.dispatch(actions.me());

        expect(store.getActions()).toEqual(expectedActions);
    });
});
