const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.config');
const OfflinePlugin = require('offline-plugin');

base.devtool = 'source-map';

// Add webpack plugins
base.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: true,
        compress: { warnings: false },
        output: { comments: false },
    }),
    new OfflinePlugin({
        caches: {
            main: ['bundle.js'],
        },
        publicPath: '/',
        relativePaths: false,
        // eslint-disable-next-line comma-dangle
    })
);

module.exports = base;
