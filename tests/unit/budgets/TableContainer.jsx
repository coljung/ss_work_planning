import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import TableContainer from '../../../app/budgets/TableContainer';
import LoadingSpinner from '../../../app/components/common/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock();

function setup(state = {}, props = {}) {
    const initialState = {
        budgetViewReducer: {
            isBudgetLoading: false,
            isDataSpreading: false,
        },
        ...state
    };

    const initialProps = {
        view: 'total',
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

    let container = document.createElement('div');
    container.id = 'hotContainer';
    document.body.appendChild(container);

    return mount(
        <TableContainer
            store={store}
            {...initialProps}
        />,
        { attachTo: document.getElementById('hotContainer') }
    );
}

describe('Top Down TableContainer', () => {
    it('Should render loading spinner while loading', () => {
        const state = {
            budgetViewReducer: {
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
            budgetViewReducer: {
                isBudgetLoading: false,
                isDataSpreading: false,
            },
        };

        const wrapper = setup(state);

        expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
    });

    it.skip('Should render loading spinner when spreading', () => {
        const state = {
            budgetViewReducer: {
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
            budgetViewReducer: {
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

        // expect(wrapper.find(HotTable)).toHaveLength(1);
    });
});
