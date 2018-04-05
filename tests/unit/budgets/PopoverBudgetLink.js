import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import PopoverBudgetLink from '../../../app/budgets/PopoverBudgetLink';

describe('PopoverBudgetLink', () => {
    it('should render correctly', () => {
        const output = shallow(
            <PopoverBudgetLink title="fsdfsdf">Hello Jest!</PopoverBudgetLink>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });

    it.skip('should render correctly with btnInTitle', () => {
        const output = shallow(
            <Board title="Hello World!" btnInTitle={<Button>Foo Bar</Button>}>Hello Jest!</Board>
        );

        expect(output.find('Button').render().text()).toBe('Foo Bar');
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
