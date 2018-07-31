const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
// eslint-disable-next-line import/no-extraneous-dependencies
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const config = require('config');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './app/styles/default-vars.less'), 'utf8'));

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: [
        'react-hot-loader/patch',
        './app/index.jsx',
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.scss', '.css', '.js', '.jsx', '.json', '.less'],
        modules: [
            path.join(__dirname, './app'),
            'node_modules',
        ],
        alias: {
            handsontable: path.resolve(__dirname, 'node_modules/handsontable-pro'),
            notifications: path.join(__dirname, './app/notifications/'),
        },
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
            },
            {
                test: /locales/,
                loader: '@alienfast/i18next-loader',
                query: { basenameAsNamespace: true },
            },
            {
                test: /(\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /(\.less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: themeVariables,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.get('node_env.env')),
                UI_PLANNING_HOST: JSON.stringify(config.get('server.exposedHost')),
                UI_PLANNING_PORT: JSON.stringify(config.get('server.exposedPort')),
                MS_PLANNING_HOST: JSON.stringify(config.get('api.planning.host')),
                MS_PLANNING_PORT: JSON.stringify(config.get('api.planning.port')),
            },
            UI_PLANNING_HOST: JSON.stringify(config.get('server.exposedHost')),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer],
            },
        }),
        new Visualizer({
            filename: './webpackBundleStats.html',
        }),
        new ProgressBarPlugin({
            format: `${chalk.blue.bold(' build [:bar] ')}${chalk.magenta.bold(':percent')} (:elapsed seconds)`,
            clear: false,
            width: 50,
        }),
    ],
};
