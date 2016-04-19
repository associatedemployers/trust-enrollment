/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    Funnel = require('broccoli-funnel'),
    fs = require('fs-extra'),
    vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

var bowerIncludes = [
  'font-awesome/css/font-awesome.css',
  'nprogress/nprogress.css',
  'c3js-chart/c3.css',
  'd3/d3.js',
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
  'socket.io-client/socket.io.js',
  'modernizr/modernizr.js'
];

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  var fonts = new Funnel('bower_components/font-awesome', {
    srcDir: '/fonts',
    include: ['*.*'],
    destDir: '/assets/fonts'
  });

  bowerIncludes.forEach(path => app.import(vendorDir + path));

  return app.toTree(fonts);
};
