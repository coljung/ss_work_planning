import {
    LOGOUT_SUCCESS,
    LOGIN_SUCCEED,
    USER_SUCCESS,
} from './types';

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCEED:
            return {
                ...state,
                ...action.result,
            };
        case USER_SUCCESS:
            return {
                ...state,
                user: action.result,
            };
        case LOGOUT_SUCCESS:
            return initialState; // Put back initialState
        default:
            return state;
    }
};

export default userReducer;
