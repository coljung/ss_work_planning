import React from 'react';
import { shallow } from 'enzyme';
import Board from '../../../app/components/Board';

describe('Board', () => {
    it('Should display title', () => {
        const output = shallow(
            <Board title="test">
                <div />
            </Board>
        );

        expect(output.find('h2').text()).toEqual('test');
    });

    it('Should contain children', () => {
        const output = shallow(
            <Board title="test">
                <p>Test</p>
            </Board>
        );

        expect(output.find('p')).toHaveLength(1);
        expect(output.find('p').text()).toEqual('Test');
    });
});
