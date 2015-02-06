/* global require, module */

var EmberApp  = require('ember-cli/lib/broccoli/ember-app'),
    fs        = require('fs'),
    vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

var app = new EmberApp({
  fingerprint: {
    replaceExtensions: ['html', 'js', 'css', 'less']
  },
});

// Vendor CSS
app.import(vendorDir + 'font-awesome/css/font-awesome.css'); // Font-Awesome
app.import(vendorDir + 'nprogress/nprogress.css');           // NProgess CSS
app.import(vendorDir + 'c3js-chart/c3.css');                 // c3.js CSS

// Vendor JS
app.import(vendorDir + 'd3/d3.js');                                           // d3.js
app.import(vendorDir + 'ember-localstorage-adapter/localstorage_adapter.js'); // LS Adapter
app.import(vendorDir + 'bootstrap/dist/js/bootstrap.min.js');                 // Bootstrap JS
app.import(vendorDir + 'moment/moment.js');                                   // Moment JS
app.import(vendorDir + 'c3js-chart/c3.js');                                   // c3.js
app.import(vendorDir + 'nprogress/nprogress.js');                             // NProgress JS

module.exports = app.toTree();
