import { expect } from 'chai';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import HotTable from 'react-handsontable';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import SectionContainer from '../../../../app/budgets/sections/SectionContainer';
import LoadingSpinner from '../../../../app/components/common/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

const initialProps = {
    budget: 'SS2018',
    version: 'V1',
    view: 'exec',
    viewData: {},
    viewDataFetched: false,
    saveBudget: jest.fn(),
    fetchBudgetMetricData: jest.fn(),
    BudgetViewReducer: {
        isBudgetLoading: false,
        isDataSpreading: false,
    },
    router: {
        location: {},
    },
    config: [],
};

const initialState = {
    data: [],
    canSave: true,
    headers: [],
    info: {},
    season: '',
    viewData: {},
    viewDataFetched: false,
    config: [],
};

function setup(props = {}) {
    let store = configureMockStore([thunk])({
        ...initialState,
        SectionReducers: {
            viewData: props.viewData,
            viewDataFetched: props.viewDataFetched,
            config: props.config,
        },
    });

    const wrapper = mount(
        <MemoryRouter>
            <SectionContainer {...props} store={store} />
        </MemoryRouter>
    );

    return {
        props,
        wrapper
    };
}

describe('Top Down SectionContainer', () => {
    it('should render loading spinner while fetching', () => {
        const { wrapper } = setup(initialProps);

        expect(wrapper.find(LoadingSpinner)).to.have.lengthOf(1);
    });

    it.skip('should render base table', () => {
        // Skipping because of a known unresolved Handontable error
        const { wrapper } = setup({
            ...initialProps,
            viewData: {
                exec: {
                    metric: {},
                    seasonyear: {},
                    total_stdpremarkdown: {},
                    total_incr_stdpremarkdown: {},
                    total_stdpostmarkdown: {},
                    total_incr_stdpostmarkdown: {},
                    total_full: {},
                    total_full_incr: {},
                    women_stdpremarkdown: {},
                    women_incr_stdpremarkdown: {},
                    women_stdpostmarkdown: {},
                    women_incr_stdpostmarkdown: {},
                    women_full: {},
                    women_full_incr: {},
                    women_full_cont: {},
                    men_stdpremarkdown: {},
                    men_incr_stdpremarkdown: {},
                    men_stdpostmarkdown: {},
                    men_incr_stdpostmarkdown: {},
                    men_full: {},
                    men_full_incr: {},
                    men_full_cont: {},
                },
            },
            viewDataFetched: true,
        });

        expect(wrapper.find(HotTable)).to.have.lengthOf(1);
    });
});
