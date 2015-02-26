/* global require, module */

var EmberApp  = require('ember-cli/lib/broccoli/ember-app'),
    fs        = require('fs'),
    vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

var app = new EmberApp({
  fingerprint: {
    replaceExtensions: ['html', 'js', 'css', 'less']
  },
});

var bowerIncludes = [
  'font-awesome/css/font-awesome.css',
  'nprogress/nprogress.css',
  'c3js-chart/c3.css',
  'd3/d3.js',
  'ember-localstorage-adapter/localstorage_adapter.js',
  'bootstrap/dist/js/bootstrap.min.js',
  'moment/moment.js',
  'c3js-chart/c3.js',
  'nprogress/nprogress.js',
  'pickadate/lib/themes/default.css',
  'pickadate/lib/themes/default.date.css',
  'pickadate/lib/picker.js',
  'pickadate/lib/picker.date.js',
  'pickadate/lib/legacy.js',
  'signature_pad/signature_pad.js',
  'animate.css/animate.css',
  'socket.io-client/socket.io.js'
];

bowerIncludes.forEach(function ( path ) {
  app.import( vendorDir + path );
});

module.exports = app.toTree();
