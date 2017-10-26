const config = require('config');
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.config');

const host = config.get('server.host');
const port = config.get('server.port');
const exposedPort = config.get('server.exposedPort');

base.entry.unshift(
    `webpack-dev-server/client?http://localhost:${exposedPort}`,
    'webpack/hot/only-dev-server'
);

base.devServer = {
    historyApiFallback: true,
    host,
    port,
    clientLogLevel: 'info',
    headers: { 'Access-Control-Allow-Origin': '*' },
    public: `localhost:${exposedPort}`,
    proxy: {
        '/api': {
            target: `http://${config.get('api.planning.host')}:${config.get(
                'api.planning.port'
            )}`,
            pathRewrite: { '^/api': '' },
            secure: false
        }
    }
};

base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    // eslint-disable-next-line comma-dangle
    new webpack.NoEmitOnErrorsPlugin()
);

module.exports = base;
