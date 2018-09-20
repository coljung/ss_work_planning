import i18n from 'i18next';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import 'handsontable-pro/dist/handsontable.full.css';
import Routes from './Routes';
import resources from './locales';
import ApiClient from './ApiClient';

// Global Styles
import './styles/styles.less';

// Store
import configureStore from './configureStore';

const client = new ApiClient();
const store = configureStore(client);

i18n.init({
    lng: 'en',
    load: 'languageOnly',
    resources,
});

export default () => (
    <Provider store={store}>
        <Router routes={Routes} history={browserHistory} />
    </Provider>
);
