// Dependencies
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './Routes';

// Global Styles
import './styles/styles';

// Store
import configureStore from './ConfigureStore';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router routes={Routes} history={browserHistory} />
            </Provider>
        );
    }
}
