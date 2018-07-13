import i18n from 'i18next';
import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import Routes from './Routes';
import resources from './locales';

// Global Styles
import './styles/styles.less';

// Store
import configureStore from './ConfigureStore';

const store = configureStore();

i18n.init({
    lng: 'en',
    load: 'languageOnly',
    resources,
});

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router routes={Routes} history={browserHistory} />
            </Provider>
        );
    }
}
