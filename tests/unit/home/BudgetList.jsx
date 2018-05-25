import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import BudgetList from '../../../app/home/BudgetList';

// Import fixture data
import budgets from '../../fixtures/budgets.json';
import seasons from '../../fixtures/season_available.json';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        visible: false,
        onOverlayClick: jest.fn(),
        fetchBudgets: jest.fn()
    }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares);

    const initialState = {
        BudgetActions: [],
        BudgetReducer: {
            budgets: budgets.data,
            seasons,
            budgetsFetched: true,
            seasonsFetched: true
        }
    };

    let store = mockStore(initialState);

    const enzymeWrapper = mount(
        <Provider store={store}>
            <BudgetList {...props} />
        </Provider>
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('BudgetList', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render BudgetList', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('li').first().text()).toBe('FW2021');
    });

    it('should open BudgetList modal archives', () => {
        const { enzymeWrapper } = setup();

        const component = shallow(enzymeWrapper.find('BudgetList').get(0));

        component.setProps({
            visible: true,
        });

        expect(component.instance().props.visible).toBeTruthy();

        const modal = shallow(component.find('Modal').get(0));

        expect(modal.find('Link').length).toBe(4);
        expect(modal.find('Link').first().prop('children').join('')).toBe('FW2019');
    });
});
