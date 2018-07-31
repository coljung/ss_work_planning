import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import BudgetHome, { BudgetHome as PureBudgetHome } from '../../../app/home/BudgetHome';
import * as sinon from 'sinon';
import i18n from 'i18next';
import LoadingSpinner from '../../../app/components/common/LoadingSpinner';
import BudgetList from '../../../app/home/BudgetList';
import BudgetCreateModal from '../../../app/home/components/BudgetCreateModal';

Enzyme.configure({ adapter: new Adapter() });

function setup(state = {}) {
    const props = {
        fetchBudgets: jest.fn(),
        fetchAvailableSeasons: jest.fn(),
        createBudget: jest.fn(),
    };

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const initialState = {
        BudgetReducer: {
            budgets: [],
            budgetsFetched: true,
            seasons: [
                { year: 2018, season: 'SS', name: 'SS18' }
            ],
            seasonsFetched: true,
            budgetCreateFetched: true,
            ...state
        },
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
    };
}

function setupPureComponent() {
    const props = {
        budgets: [
            { id: 1, year: 2019, season: 'FW' },
        ],
        budgetsFetched: true,
        seasons: [
            { year: 2020, season: 'FW', name: 'FW20' },
            { year: 2021, season: 'FW', name: 'FW21' }
        ],
        seasonsFetched: true,
        budgetCreateFetched: true,
        fetchBudgets: jest.fn(),
        fetchAvailableSeasons: jest.fn(),
        createBudget: jest.fn(),
    };

    const enzymeWrapper = mount(<PureBudgetHome {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('BudgetHome', () => {
    let i18nStub;

    beforeEach(() => {
        jest.useFakeTimers();

        i18nStub = sinon.stub(i18n, 't');

        setResource('home.budgetsDashboard');
    });

    afterEach(() => {
        jest.useRealTimers();

        i18nStub.restore();
    });

    it('Should render BudgetHome', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('.board h2').text()).toBe('home.budgetsDashboard');
    });

    it('Should show spinner when fetching budgets', () => {
        const { enzymeWrapper } = setup({
            budgetsFetched: false,
        });

        expect(enzymeWrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('Should show spinner when creating budget', () => {
        const { enzymeWrapper } = setup({
            budgetCreateFetched: false,
        });

        expect(enzymeWrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('Should show budget list', () => {
        const { enzymeWrapper } = setup({
            budgetsFetched: true,
            budgetCreateFetched: true,
        });

        expect(enzymeWrapper.find(BudgetList)).toHaveLength(1);
    });

    it('Should have budget creation button', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find(BudgetCreateModal)).toHaveLength(1);
    });

    it('Should disable budget creation button when fetching seasons', () => {
        const { enzymeWrapper } = setup({
            seasonsFetched: false,
        });

        expect(enzymeWrapper.find(BudgetCreateModal).prop('disabled')).toBeTruthy();
    });

    it('Should enable budget creation button after fetching seasons', () => {
        const { enzymeWrapper } = setup({
            seasonsFetched: true,
        });

        expect(enzymeWrapper.find(BudgetCreateModal).prop('disabled')).toBeFalsy();
    });

    it('Should fetch available seasons when receiving new budgets', () => {
        const { enzymeWrapper } = setupPureComponent();

        const spy = jest.spyOn(enzymeWrapper.props(), 'fetchAvailableSeasons');

        enzymeWrapper.setProps({ budgets: [
            { id: 1, year: 2019, season: 'FW' },
            { id: 2, year: 2020, season: 'FW' },
        ]});

        jest.runAllTimers();

        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('Should not fetch available seasons on other props change', () => {
        const { enzymeWrapper } = setupPureComponent();

        const spy = jest.spyOn(enzymeWrapper.props(), 'fetchAvailableSeasons');

        enzymeWrapper.setProps({ test: true });

        jest.runAllTimers();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should fetch budgets when receiving new budgets', () => {
        const { enzymeWrapper } = setupPureComponent();

        const spy = jest.spyOn(enzymeWrapper.props(), 'fetchBudgets');

        enzymeWrapper.setProps({ budgets: [
                { id: 1, year: 2019, season: 'FW' },
                { id: 2, year: 2020, season: 'FW' },
            ]});

        jest.runAllTimers();

        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('Should not fetch budgets on other props change', () => {
        const { enzymeWrapper } = setupPureComponent();

        const spy = jest.spyOn(enzymeWrapper.props(), 'fetchBudgets');

        enzymeWrapper.setProps({ test: true });

        jest.runAllTimers();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Should create budget when create button invoked', () => {
        const { enzymeWrapper } = setupPureComponent();

        const spy = jest.spyOn(enzymeWrapper.props(), 'createBudget');

        enzymeWrapper.find("BudgetCreateModal").prop('onSave')('FW', 2020);

        jest.runAllTimers();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            year: 2020,
            season: 'FW',
        });
    });

    const setResource = (key) => {
        i18nStub.withArgs(key).returns(key);
    };
});
