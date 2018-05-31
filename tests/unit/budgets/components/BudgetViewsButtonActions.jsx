import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import BudgetViewsButtonActions from '../../../../app/budgets/components/BudgetViewsButtonActions';

describe('BudgetViewsButtonActions', () => {
    it('should render base layout', () => {
        const output = shallow(
            <BudgetViewsButtonActions saveNew="fsdfsdf">Hello Jest!</BudgetViewsButtonActions>
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
