import { expect } from 'chai';
import { MESSAGES, CLEAR_MESSAGES, messages, clearMessages } from '../../../app/notifications/NotificationActions';

describe('NotificationActions', () => {

    it.skip('should return Notification action (success)', () => {
        const msg = {content: "I am a message", isError: false, response: { body: { message: 'message'}}};
        expect(messages(msg)).to.deep.equal({type: MESSAGES, message: {...msg, messageType: 'success'}})
    });

    it.skip('should return Notification action (error)', () => {
        const msg = {content: "I am a message", isError: true, response: { body: { message: 'message'}}};
        expect(messages(msg)).to.deep.equal({type: MESSAGES, message: {...msg, messageType: 'error'}});
    });

    it('should messages', () => {
        let message = { content: 'foo', response: null, isError: false };
        let res = messages(message);
        expect(res).to.deep.equal({ type: MESSAGES, message });
        expect(res.message.messageType).to.equal('success');

        message.isError = true;
        res = messages(message);
        expect(res).to.deep.equal({ type: MESSAGES, message });
        expect(res.message.messageType).to.equal('error');

        message.content = { message: 'foo' };
        const response = { body: { message: 'bar' } };
        message.response = response;
        res = messages(message);
        expect(res).to.deep.equal({
            type: MESSAGES,
            message: {
                content: 'foo: bar',
                response,
                isError: true,
                messageType: 'error',
            },
        });

        message = {
            content: {
                message: 'foo'
            },
            response: {
                body: null,
                error: {
                    message: 'bahh'
                }
            },
            isError: true,
            messageType: 'error',
        };
        res = messages(message);
        expect(res).to.deep.equal({ type: MESSAGES, message });
    });

    it('should clearMessages', () => {
        expect(clearMessages()).to.deep.equal({ type: CLEAR_MESSAGES });
    });
});
