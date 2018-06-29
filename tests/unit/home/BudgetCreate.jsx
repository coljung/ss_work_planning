import { join } from 'path';
import nock from 'nock';
import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import BudgetCreate, { BudgetCreate as PureBudgetCreate } from '../../../app/home/BudgetCreate';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        // seasons: [], // same from redux provider
        // seasonsFetched: false, // same from redux provider
        visible: true,
        onOverlayClick: jest.fn(),
        fetchAvailableSeasons: jest.fn(),
        budgetCreateFetched: true,
        createBudget: jest.fn(),
        resetState: jest.fn(),
    }

    const middlewares = [thunk]
    const mockStore = configureStore(middlewares);

    // Could be imported from app/home/BudgetReducer.js
    const initialState = {
        BudgetActions: [],
        BudgetReducer: {
            budgets: [],
            seasons: [
                { year: 2018, season: 'SS', name: 'SS18' },
                { year: 2018, season: 'FW', name: 'FW18' },
                { year: 2019, season: 'SS', name: 'SS19' },
                { year: 2019, season: 'FW', name: 'FW19' },
                { year: 2020, season: 'SS', name: 'SS20' },
                { year: 2020, season: 'FW', name: 'FW20' },
                { year: 2021, season: 'SS', name: 'SS21' },
                { year: 2021, season: 'FW', name: 'FW21' },
                { year: 2022, season: 'SS', name: 'SS22' },
                { year: 2022, season: 'FW', name: 'FW22' },
                { year: 2023, season: 'SS', name: 'SS23' },
                { year: 2023, season: 'FW', name: 'FW23' }
            ],
            budgetsFetched: false,
            seasonsFetched: true,
            budgetCreateFetched: true,

        }
    };

    let store = mockStore(initialState);

    const enzymeWrapper = mount(
        <Provider store={store}>
            <BudgetCreate {...props} />
        </Provider>
    );

    return {
        props,
        enzymeWrapper,
        store
    }
}

function setupPureComponent() {
    const props = {
        seasons: [
            { year: 2018, season: 'SS', name: 'SS18' },
            { year: 2018, season: 'FW', name: 'FW18' }
        ],
        seasonsFetched: true,
        budgetCreateFetched: true,
        visible: true,
        onOverlayClick: jest.fn(),
        fetchAvailableSeasons: jest.fn(),
        createBudget: jest.fn(),
        resetState: jest.fn()
    }

    const enzymeWrapper = mount(<PureBudgetCreate {...props} />);

    return {
        props,
        enzymeWrapper
    }
}

describe('BudgetCreate', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render BudgetCreate', () => {
        const { enzymeWrapper } = setup();

        // Modal title content
        expect(enzymeWrapper.find('#rcDialogTitle0').text()).toBe('Create Budget');

        // Open the <Select />
        enzymeWrapper.find('.ant-select').simulate('click');

        jest.runAllTimers();

        const dropdownWrapper = mount(enzymeWrapper.find('Trigger').instance().getComponent());
        expect(dropdownWrapper.find('MenuItem').length).toBe(12);
        expect(dropdownWrapper.find('MenuItem').at(0).text()).toBe('SS18');
    });

    it('should close modal', () => {
        const { enzymeWrapper } = setupPureComponent();
        const spyReset = jest.spyOn(enzymeWrapper.props(), 'resetState');
        const spyOverlay = jest.spyOn(enzymeWrapper.props(), 'onOverlayClick');

        enzymeWrapper.find('.ant-modal-close').simulate('click');

        jest.runAllTimers();

        expect(spyReset).toHaveBeenCalled();
        expect(spyOverlay).toHaveBeenCalled();
    });

    it('should save new budget', () => {
        const { enzymeWrapper } = setupPureComponent();
        const budget = {
            year: 2020,
            season: 'SS'
        };
        const spy = jest.spyOn(enzymeWrapper.props(), 'createBudget');

        nock(UI_PLANNING_HOST)
        .log(console.log)
        .post('/api/planning/budgets', budget)
        .replyWithFile(201, join(__dirname, '..', '..', 'fixtures', 'create_budget.json'), {
            'Content-Type': 'application/json'
        });

        enzymeWrapper.setState(budget, () => {
            enzymeWrapper.find('#createButtonSave').first().simulate('click');

            jest.runAllTimers();

            expect(spy).toHaveBeenCalled();
        });
    });

    it('should set new props', () => {
        const { enzymeWrapper } = setupPureComponent();

        enzymeWrapper.setProps({
            visible: false
        });

        expect(enzymeWrapper.prop('visible')).toBeFalsy();
    });

    it('should go fetch seasons on receive props', () => {
        const { enzymeWrapper } = setupPureComponent();
        const spy = jest.spyOn(enzymeWrapper.props(), 'fetchAvailableSeasons');

        enzymeWrapper.setProps({
            visible: true,
            seasonsFetched: false
        });

        jest.runAllTimers();

        expect(spy).toHaveBeenCalled();
        expect(enzymeWrapper.prop('visible')).toBeTruthy();
    });

    it('should handle change', () => {
        const { enzymeWrapper } = setupPureComponent();

        enzymeWrapper.instance().handleSeasonChange('SS-22');

        const newState = enzymeWrapper.state();

        expect(newState).toEqual({
            year: '22',
            season: 'SS',
            createNewValue: 'lastyear',
        });
    });

    it('should get an undefined seasons from props', () => {
        const { enzymeWrapper } = setupPureComponent();

        enzymeWrapper.setProps({
            visible: true,
            seasonsFetched: true,
            seasons: undefined
        });

        const dropdownWrapper = mount(enzymeWrapper.find('Trigger').instance().getComponent());
        expect(dropdownWrapper.find('MenuItem').length).toBe(0);
    });
});
