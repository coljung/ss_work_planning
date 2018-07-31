import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import CustomNavigation from '../../../../app/components/customNavigation/CustomNavigation';

let props;
let sandbox;

describe.skip('<CustomNavigation />', () => {
    beforeAll(() => {
        sandbox = sinon.sandbox.create();
        props = {clearMessages: sandbox.spy()};
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render base layout', () => {
        const wrapper = shallow(<CustomNavigation {...props} />);
        expect(wrapper.html()).to.equal('<div></div>');
    });

    it('should receive props', () => {
        const clock = sandbox.useFakeTimers(Date.now());
        sandbox.stub(antdMessage, 'success');

        const wrapper = shallow(<CustomNavigation {...props} />);
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

        const wrapper = shallow(<CustomNavigationDefault store={store} />);
        expect(wrapper.props().message).to.deep.equal({
            content: 'foobar',
            messageType: 'error',
        });
    });
});
