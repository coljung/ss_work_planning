import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Root from './Root.jsx';

OfflinePluginRuntime.install({
    ServiceWorker: {
        events: true,
        prefetchRequest: {
            credentials: 'same-origin',
        },
    },
});

ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('app'),
);
