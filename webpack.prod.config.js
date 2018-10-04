const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.config');
const OfflinePlugin = require('offline-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

base.devtool = 'source-map';

base.output.filename = 'bundle.[hash].js';
// Override the first plugin ExtractTextPlugin
base.plugins[0] = new ExtractTextPlugin({
    filename: 'styles.[hash].css',
    allChunks: true,
});

// Add webpack plugins
base.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: true,
        compress: { warnings: false },
        output: { comments: false },
    }),
    new OfflinePlugin({
        // prefetchRequest: { credentials: 'include' },
        caches: 'all',
        publicPath: '/',
        relativePaths: false,
        // eslint-disable-next-line comma-dangle
    })
);

module.exports = base;
