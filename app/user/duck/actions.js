import {
    // LOGOUT
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    // LOGIN
    LOGIN_REQUEST,
    LOGIN_SUCCEED,
    LOGIN_FAILED,
    // User
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAILED,
} from './types';
import { BACKEND_APP_CODE } from '../../constants/common';
import {
    authenticate as authenticateOperation,
    logout as logoutOperation,
    me as meOperation,
} from './operations';

export const authenticate = () => (
    {
        types: [LOGIN_REQUEST, LOGIN_SUCCEED, LOGIN_FAILED],
        promise: authenticateOperation, // eslint-disable-line no-use-before-define
    }
);

export const logout = () => (
    {
        types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED],
        promise: logoutOperation, // eslint-disable-line no-use-before-define
    }
);

export const me = () => (
    {
        types: [USER_REQUEST, USER_SUCCESS, USER_FAILED],
        promise: client => client.get(`/auth/users/me?scopes=${BACKEND_APP_CODE}`),
    }
);
