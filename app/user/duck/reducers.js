import {
    LOGOUT_SUCCESS,
    LOGIN_SUCCEED,
} from './types';

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCEED:
            return {
                ...state,
                ...action.result,
            };
        case LOGOUT_SUCCESS:
            return initialState; // Put back initialState
        default:
            return state;
    }
};

export default userReducer;
