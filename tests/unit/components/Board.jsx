import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import Board from '../../../app/components/Board';

describe('Board', () => {
    it('should render correctly', () => {
        const output = shallow(
            <Board title="fsdfsdf">Hello Jest!</Board>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it('should render correctly with btnInTitle', () => {
        const output = shallow(
            <Board title="Hello World!" btnInTitle={<Button>Foo Bar</Button>}>Hello Jest!</Board>
        );

        expect(output.find('Button').render().text()).toBe('Foo Bar');
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
