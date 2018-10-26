/* eslint-disable import/no-commonjs */
require('newrelic');
const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const config = require('config');
const basicAuth = require('node-basicauth');
const httpProxy = require('http-proxy-middleware');
const ssense = require('@ssense/framework');

const host = config.get('server.host');
const port = config.get('server.port');
const apiPlanningBaseUrl = `http://${config.get('api.planning.host')}:${config.get('api.planning.port')}`;

const target = process.env.API_HOST || `http://${config.get('api.planning.host')}:${config.get('api.planning.port')}`;
const proxy = httpProxy({
    target,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // <-- this will remove the /api prefix
});

const targetAuth = process.env.API_AUTH_HOST || `http://${config.get('api.auth.host')}`;
const proxyAuth = httpProxy({
    target: targetAuth,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' }, // <-- this will remove the /api prefix
});

const app = express();

// Include authentication middleware
const authModule = new ssense.AuthModule({
    authServerHost: config.get('api.auth.host'),
    authServerSecure: config.get('api.auth.secure'),
    publicRoutes: [ // Set home page and main resources as public
        /^\/+$/,
        /^\/favicon.ico$/,
        /^\/bundle.*\.js$/,
        /^\/styles.*\.css$/,
        /^\/auth\/.*$/,
    ],
});
if (config.get('api.auth.enabled')) {
    app.use(authModule.authenticate());
}

app.use(cors());
// Serve index.html, js and css files
app.use(express.static(path.resolve(__dirname, 'build')));
// Serve favicon and logo
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api', proxy);
app.use('/auth', proxyAuth);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return;
    }

    // eslint-disable-next-line no-console
    console.log(`Listening at http://${host}:${port}`);
});
