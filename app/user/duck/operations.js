import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
} from './types';
import { BACKEND_APP_CODE } from '../../constants/common';
// import { me } from './actions';


const authenticate = dispatch => new Promise((resolve, reject) => {
    ssense.authenticate(BACKEND_APP_CODE, (err, data) => {
        if (err) {
            // If authenticate returns a 403, the current user's account has been disabled, close the session
            if (err.statusCode === 403) {
                // dispatch({
                //     type: LOGOUT_FAILED,
                // });
                return reject();
            }

            // dispatch(emitMessage(
            //     getReverseTranslation(store, err.message),
            //     MessageType.Error
            // ));
            return resolve(authenticate(dispatch));
        }

        console.log('data', data);

        return resolve(data);
    });
});

const logout = dispatch =>
    new Promise(resolve => ssense.logout(() => {
        resolve();

        // return dispatch(me());
        // return authenticate(dispatch);
    }));

// const me = dispatch =>

export default {
    authenticate,
    // me,
    logout,
};
