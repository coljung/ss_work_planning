import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
} from './types';
import { BACKEND_APP_CODE } from '../../constants/common';


const authenticate = dispatch => new Promise((resolve, reject) => {
    ssense.authenticate(BACKEND_APP_CODE, (err, data) => {
        if (err) {
            // If authenticate returns a 403, the current user's account has been disabled, close the session
            /* istanbul ignore next */
            if (err.statusCode === 403) {
                return reject();
            }

            return resolve(authenticate(dispatch));
        }

        return resolve(data);
    });
});

const logout = dispatch =>
    new Promise(resolve => ssense.logout(() => resolve()));

export default {
    authenticate,
    logout,
};
