import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Button } from 'antd';
import PopoverBudgetLink from '../../../app/budgets/PopoverBudgetLink';

describe('PopoverBudgetLink', () => {
    it('should render correctly', () => {
        const output = shallow(
            <PopoverBudgetLink>Links here!</PopoverBudgetLink>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
