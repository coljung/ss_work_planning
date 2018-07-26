import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { HotTable } from '@handsontable-pro/react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import SectionContainer from '../../../../app/budgets/sections/SectionContainer';
import LoadingSpinner from '../../../../app/components/common/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

function setup(state = {}, props = {}) {
    const initialState = {
        BudgetViewReducer: {
            isBudgetLoading: false,
            isDataSpreading: false,
        },
        ...state
    };

    const initialProps = {
        viewData: {
            data: [],
            headers: [],
            info: {},
        },
        onPushHistory: jest.fn(),
        onCellChange: jest.fn(),
        ...props,
    };

    let store = configureMockStore([thunk])(initialState);

    return mount(
        <SectionContainer
            store={store}
            {...initialProps}
        />
    );
}

describe('Top Down SectionContainer', () => {
    it('Should render loading spinner while loading', () => {
        const state = {
            BudgetViewReducer: {
                isBudgetLoading: true,
                isDataSpreading: false,
            },
        };

        const props = {
            viewData: {
                data: [{}],
                headers: [],
                info: {},
            }
        };

        const wrapper = setup(state, props);

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it('Should render loading spinner when no data', () => {
        const state = {
            BudgetViewReducer: {
                isBudgetLoading: false,
                isDataSpreading: false,
            },
        };

        const wrapper = setup(state);

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it.skip('Should render loading spinner when spreading', () => {
        const state = {
            BudgetViewReducer: {
                isBudgetLoading: false,
                isDataSpreading: true,
            },
        };

        const props = {
            viewData: {
                data: [{
                    info: {},
                    previous: { value: 1000 },
                }],
                headers: [['Name', 'Previous']],
                info: {},
            }
        };

        const wrapper = setup(state, props);

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it.skip('Should render base table', () => {
        const state = {
            BudgetViewReducer: {
                isBudgetLoading: false,
                isDataSpreading: false,
            },
        };

        const props = {
            viewData: {
                data: [{
                    test: true,
                }],
                headers: [['Name', 'Previous', 'Pre-mkd']],
                info: {},
            }
        };

        const wrapper = setup(state, props);

        expect(wrapper.find(HotTable)).toHaveLength(1);
    });
});
