import { MESSAGES, CLEAR_MESSAGES } from './NotificationActions';

export default (state = null, action) => {
    switch (action.type) {
        case MESSAGES:
            return action.message;
        case CLEAR_MESSAGES:
            return null;
        default:
            return state;
    }
};
