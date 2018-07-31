import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import BudgetViewsContainer from '../../../app/budgets/BudgetViewsContainer';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = { };

    const enzymeWrapper = mount(
        <Provider >
            <BudgetViewsContainer {...props} />
        </Provider>
    );

    return {
        props,
        enzymeWrapper
    };
}

describe.skip('BudgetViewsContainer', () => {
    it('should render base layout', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('h1')).to.have.lengthOf(1);
    });
});
