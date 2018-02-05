import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import BudgetCreate from '../../../app/budgets/BudgetCreate';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    // seasons: [], // same from redux provider
    // seasonsFetched: false, // same from redux provider
    visible: true,
    onOverlayClick: jest.fn(),
    fetchSeasons: jest.fn(),
    createBudget: jest.fn(),
    resetState: jest.fn()
  }

  const mockStore = configureStore();

  // Could be imported from app/budgets/BudgetReducer.js
  const initialState = {
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
    seasonsFetched: true
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
});
