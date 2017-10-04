import { expect } from 'chai';
import NotificationReducer from '../../../app/notifications/NotificationReducer';
import {
    MESSAGES,
    CLEAR_MESSAGES,
} from '../../../app/notifications/NotificationActions';

let initialState;

describe('NotificationReducer', () => {
    beforeEach(() => {
        initialState = null;
    });

    it('should return default state', () => {
        const res = NotificationReducer(initialState, { type: 'foo' });
        expect(res).to.deep.equal(initialState);
    });

    it('should MESSAGES', () => {
        const res = NotificationReducer(initialState, { type: MESSAGES, message: 'hi!' });
        expect(res).to.deep.equal('hi!');
    });

    it('should CLEAR_MESSAGES', () => {
        const res = NotificationReducer(initialState, { type: CLEAR_MESSAGES, message: 'hi!'});
        expect(res).to.deep.equal(null);
    });
});