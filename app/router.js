import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('employee-login', { path: '/employee/login' }, function () {
    this.route('verify-id', { path: '/verify-membership/:token' });
  });
  this.route('company-login', { path: '/company/login' });

  this.route('employee-account', { path: '/account' }, function () {
    this.route('index', { path: '/' });
    this.route('edit', function () {
      this.route('index', { path: '/select' });
      this.route('qualify-event');
      this.route('upload-documents');
      this.route('review', { path: '/review/:id' });
    });
    this.route('documents');
  });

  this.route('company-account', { path: '/company' }, function () {
    this.route('index', { path: '/summary' });
    this.route('employees', function() {
      this.route('add');
    });
    this.route('forms');
    this.route('employee');
  });

  this.route('enrollment', { path: '/enroll' });
  this.route('sign', { path: '/sign/:handoffId' });

  this.route('faq', { path: '/frequently-asked-questions' }, function () {
    this.route('index', { path: '/' });
    this.route('single', { path: '/:id' });
  });

  this.route('support', function() {
    this.route('company', function() {
      this.route('employees');
    });
    this.route('employee');
  });
});

export default Router;
