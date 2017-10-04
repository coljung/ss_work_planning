// Action names
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
        } else {
            message.content = 'Error found';
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
