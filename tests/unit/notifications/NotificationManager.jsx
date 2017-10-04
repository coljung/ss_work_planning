import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import {message as antdMessage} from 'antd';
import configureMockStore from 'redux-mock-store';
import NotificationManagerDefault, { NotificationManager } from '../../../app/notifications/NotificationManager';

let props;
let sandbox;

describe('<NotificationManager />', () => {
    before(() => {
        sandbox = sinon.sandbox.create();
        props = {clearMessages: sandbox.spy()};
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render base layout', () => {
        const wrapper = shallow(<NotificationManager {...props} />);
        expect(wrapper.html()).to.equal('<div></div>');
    });

    it('should receive props', () => {
        const clock = sandbox.useFakeTimers(Date.now());
        sandbox.stub(antdMessage, 'success');

        const wrapper = shallow(<NotificationManager {...props} />);
        wrapper.instance().componentWillReceiveProps({message: {content: 'foo', messageType: 'success'}});
        expect(props.clearMessages.callCount).to.equal(0);
        clock.tick(8000);
        expect(props.clearMessages.callCount).to.equal(1);

        wrapper.instance().componentWillReceiveProps({});
        expect(props.clearMessages.callCount).to.equal(1);
        clock.tick(8000);
        expect(props.clearMessages.callCount).to.equal(1);
    });

    it('should mount connected component', () => {
        const mockStore = configureMockStore([]);
        const store = mockStore({
            Message: {
                content: 'foobar',
                messageType: 'error',
            },
        });

        const wrapper = shallow(<NotificationManagerDefault store={store} />);
        expect(wrapper.props().message).to.deep.equal({
            content: 'foobar',
            messageType: 'error',
        });
    });
});
