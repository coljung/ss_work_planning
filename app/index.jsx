import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Root from './Root.jsx';

OfflinePluginRuntime.install();

ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('app'),
);
