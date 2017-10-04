import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Board from '../../../app/components/Board';
import { NotificationManager } from '../../../app/notifications/NotificationManager';


describe('< Board />', () => {
	let props;

	
	
	it('should return a button in title', () => {
		props = {btnInTitle: React.createElement('test'), title: 'Test', id: '1'}
		const wrapper = shallow(<Board {...props} ><div className="test" /></Board>);
		const board = wrapper.find('.board');
		expect(board).to.have.length(1);
		expect(board.props().id).to.equal('1');
		expect(wrapper.contains(<test />)).to.equal(true);
		expect(wrapper.find('h2').node.props.children).to.equal('Test');
	})

	it('should NOT return a button in title', () => {
		props = {btnInTitle: null, title: 'Test', id: '1'}
		const wrapper = shallow(<Board {...props} ><div className="test" /></Board>);
		const board = wrapper.find('.board');
		expect(board).to.have.length(1);
		expect(board.props().id).to.equal('1');
		expect(wrapper.contains(<test />)).to.equal(false);
		expect(wrapper.find('h2').node.props.children).to.equal('Test');
	})
})