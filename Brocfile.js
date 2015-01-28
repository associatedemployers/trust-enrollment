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

// Vendor JS
app.import(vendorDir + 'ember-localstorage-adapter/localstorage_adapter.js'); // LS Adapter
app.import(vendorDir + 'bootstrap/dist/js/bootstrap.min.js'); // Bootstrap JS
app.import(vendorDir + 'moment/moment.js'); // Moment JS

module.exports = app.toTree();
