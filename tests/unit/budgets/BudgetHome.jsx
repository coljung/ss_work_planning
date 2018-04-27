import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import BudgetHome from '../../../app/budgets/BudgetHome';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = { }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares);

    const initialState = {
        BudgetActions: [],
        BudgetReducer: {
            budgets: [],
            seasons: [
                { year: 2018, season: 'SS', name: 'SS18' }
            ],
            budgetsFetched: false,
            seasonsFetched: true
        }
    };

    let store = mockStore(initialState);

    const enzymeWrapper = mount(
        <Provider store={store}>
            <BudgetHome {...props} />
        </Provider>
    );

    return {
        props,
        enzymeWrapper
    }
}

describe('BudgetHome', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render BudgetHome', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('.board h2').text()).toBe('Budgets Dashboard');
    });

    it('should toggle View Archived Modal', () => {
        const { enzymeWrapper } = setup();
        const budgetHome = enzymeWrapper.find('BudgetHome').get(0);
        const shallowBudgetHome = shallow(budgetHome);
        const spy = jest.spyOn(shallowBudgetHome.instance(), 'toggleViewArchivedModal');

        shallowBudgetHome.instance().toggleViewArchivedModal();

        jest.runAllTimers();

        expect(spy).toHaveBeenCalled();
        expect(shallowBudgetHome.state('viewArchivedModalActive')).toBeTruthy();
    });

    it('should toggle Create Modal', () => {
        const { enzymeWrapper } = setup();
        const budgetHome = enzymeWrapper.find('BudgetHome').get(0);
        const shallowBudgetHome = shallow(budgetHome);
        const spy = jest.spyOn(shallowBudgetHome.instance(), 'toggleCreateModal');

        shallowBudgetHome.instance().toggleCreateModal();

        jest.runAllTimers();

        expect(spy).toHaveBeenCalled();
        expect(shallowBudgetHome.state('createModalActive')).toBeTruthy();
    });
});
