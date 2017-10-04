const path = require('path');
const webpack = require('webpack');
const config = require('config');
const chalk = require('chalk');
// eslint-disable-next-line import/no-extraneous-dependencies
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const base = require('./webpack.config');

const HOST = config.get('server.host');
const PORT = config.get('server.port');

base.entry.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, 'webpack/hot/only-dev-server');

base.devServer = {
    historyApiFallback: true,
    host: HOST,
    port: 8003,
    clientLogLevel: 'info',
    headers: { 'Access-Control-Allow-Origin': '*' },
    public: `localhost:${PORT}`,
    // for proxy, check https://github.com/Groupe-Atallah/ui-store/blob/v1/webpack.dev.config.js#L21
};

base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
        format: `${chalk.blue.bold(' build [:bar] ')}${chalk.magenta.bold(':percent')} (:elapsed seconds)`,
        clear: false,
        width: 50,
    }),
    // eslint-disable-next-line comma-dangle
    new webpack.NoEmitOnErrorsPlugin()
);

module.exports = base;
