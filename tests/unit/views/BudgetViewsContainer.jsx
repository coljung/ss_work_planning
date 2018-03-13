import { join } from 'path';
import nock from 'nock';
import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import BudgetViewsContainer from '../../../app/views/BudgetViewsContainer';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = { }

  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);

  const initialState = {
    newVersion: null,
    versions: [],
  };

  let store = mockStore(initialState);

  const enzymeWrapper = mount(
    <Provider store={store}>
      <BudgetViewsContainer {...props} />
    </Provider>
  );

  return {
    props,
    enzymeWrapper
  }
}

describe.skip('BudgetViewsContainer', () => {
    it('should render base layout', () => {
        const { enzymeWrapper } = setup();
        expect(enzymeWrapper.find('h1')).to.have.lengthOf(1);

    });

});
