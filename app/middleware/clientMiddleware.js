/* global ssense */
import { BACKEND_APP_CODE } from '../constants/common';
import { messages } from '../notifications/NotificationActions';
import { authenticate as authenticateAction } from '../user/duck/actions';

export default function clientMiddleware(client) {
    return ({ dispatch, getState }) =>
        next => action => { // eslint-disable-line arrow-parens
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
            if (!promise) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({ ...rest, type: REQUEST });

            return promise(client)
                .then(
                result => next({ ...rest, result, type: SUCCESS }),
                async (error) => {
                    // if request return 401 show ssense authetication
                    if (error.status === 401) {
                        await dispatch(authenticateAction()); // eslint-disable-line no-use-before-define
                        // Retry re-dispatch same request and promise again after login
                        dispatch({
                            types: [REQUEST, SUCCESS, FAILURE],
                            promise,
                            ...rest,
                        });
                        return;
                    }

                    // Show error message in UI
                    dispatch(messages({ isError: true, error }));

                    return next({ ...rest, error, type: FAILURE }); // eslint-disable-line consistent-return
                },
                )
                .catch((error) => {
                    dispatch(messages({ isError: true, error }));
                    return next({ ...rest, error, type: FAILURE });
                });
        };
}
