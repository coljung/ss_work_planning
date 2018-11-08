import i18n from 'i18next';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createToggle } from '@mathdoy/toggle';
import { ToggleProvider } from '@mathdoy/toggle-react';
import { createToggleQuerystring } from '@mathdoy/toggle-querystring';
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

const toggleQuerystring = createToggleQuerystring({
    // Query string parameter
    param: 'features',
    // Default features
    features: {
        createBudget: false,
        saveAs: false,
    },
});

const toggle = createToggle({
    features: toggleQuerystring(window ? window.location.search : ''),
});

i18n.init({
    lng: 'en',
    load: 'languageOnly',
    resources,
});

export default () => (
    <ToggleProvider toggle={toggle}>
        <Provider store={store}>
            <Router routes={Routes} history={browserHistory} />
        </Provider>
    </ToggleProvider>
);
