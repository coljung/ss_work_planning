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
        budgetsFetched: true,
        budgets: [
            {
                'id':'21',
                'season':'SS',
                'year':'2020',
                'created_at':'2018-06-28T20:16:20.306Z',
                'updated_at':'2018-06-28T20:16:20.306Z',
                'name':'SS20',
                'versions':[
                    {'id':'52',
                    'budget_id':'21',
                    'name':'V1',
                    'created_at':'2018-06-28T20:16:20.312Z',
                    'updated_at':'2018-06-28T20:16:20.312Z'}
                ]
            }
        ]
    }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares);

    const initialState = {
        BudgetActions: [],
        BudgetReducer: {
            budgets: budgets,
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
        expect(enzymeWrapper.find('li').first().text()).toBe('SS2020');
    });

    it.skip('should open BudgetList modal archives', () => {
        const { enzymeWrapper } = setup();

        const component = shallow(enzymeWrapper.find('BudgetList').get(0));

        component.setProps({
            visible: true,
        });

        expect(component.instance().props.visible).toBeTruthy();

        const modal = shallow(component.find('Modal').get(0));
        console.log('-----------', modal.instance());
        expect(modal.find('Link').length).toBe(4);
        expect(modal.find('Link').first().prop('children').join('')).toBe('FW2019');
    });
});
