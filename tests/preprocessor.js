var babelJest = require('babel-jest');
require('babel-register'); // support ES6 'import' statements
var webpackAlias = require('jest-webpack-alias');
var package = require('../package.json');

module.exports = {
  process: function(src, filename) {
    if (filename.indexOf('node_modules') === -1) {
      src = babelJest.process(src, filename, package.jest);
      src = webpackAlias.process(src, filename);
    }

    return src;
  }
};
