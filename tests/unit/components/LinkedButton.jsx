import React from 'react';
import sinon from 'sinon';
import * as router from 'react-router';
import { Button } from 'antd';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LinkedButton from '../../../app/components/LinkedButton';

let sandbox;
let props;

describe('<LinkedButton />', () => {
    before(() => {
        sandbox = sinon.sandbox.create();
    });

    beforeEach(() => {
        router.browserHistory = { push: Function };
        props = {
            to: '/unit-test',
            buttonProp: 'test',
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should render layout', () => {
        const wrapper = shallow(<LinkedButton {...props} ><div className="test-div"/></LinkedButton>);
        expect(wrapper.find(Button).prop('buttonProp')).to.equal(props.buttonProp);
        expect(wrapper.find(Button).childAt(0).hasClass('test-div'));
    });

    it('simulate click', () => {
        const browserHistoryStub = sandbox.stub(router.browserHistory, 'push');
        const wrapper = shallow(<LinkedButton {...props} ><div className="test-div"/></LinkedButton>);
        wrapper.find(Button).simulate('click');
        expect(browserHistoryStub.calledWith(props.to));
    });
});
