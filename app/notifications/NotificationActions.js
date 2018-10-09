// Action names
import i18n from 'i18next';

export const MESSAGES = 'MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

// Internal actions
// export function message(errorAction, response = null, isError) {
export function messages(message) {
    let messageTxt = message.content;
    if (message.isError) {
        const respTxt = message.response;
        if (respTxt && respTxt.body) {
            messageTxt = `${messageTxt.message}: ${respTxt.body.message}`;
            message.content = messageTxt;
        } else if (respTxt && respTxt.error.message) {
            messageTxt = `${messageTxt.message}: ${respTxt.error.message}`;
            message.content = messageTxt;
        } else if (message.error && message.error.status) {
            message.content = i18n.t([`error.${message.error.status}`, 'error.unspecific']);
        } else if (message.error) {
            message.content = message.error.message;
        } else if (!message.content) {
            message.content = i18n.t('notification.errorFound');
        }
        message.messageType = 'error';
    } else {
        message.messageType = 'success';
    }
    return {
        type: MESSAGES,
        message,
    };
}

export function clearMessages() {
    return {
        type: CLEAR_MESSAGES,
    };
}
