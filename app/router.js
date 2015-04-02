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
    this.route('employees');
    this.route('forms');
    this.route('employee', { path: '/employee/:id' }, function () {
      this.route('terminate');
    });
    this.route('add-employees', { path: '/employees/add' }, function () {
      this.route('index', { path: '/' });
      this.route('bulk');
    });
    this.route('settings', function() {
      this.route('communications');
      this.route('account');
      this.route('enrollment', function () {
        this.route('index', { path: '/' });
        this.route('enrollment-periods');
        this.route('contribution');
        this.route('eligibility');
      });
    });
  });

  this.route('enrollment', { path: '/enroll' });
  this.route('sign', { path: '/sign/:handoffId' });

  this.route('faq', { path: '/frequently-asked-questions' }, function () {
    this.route('index', { path: '/' });
    this.route('single', { path: '/:id' });
  });

  this.route('support', function() {
    this.route('company');
    this.route('employee');
  });
});

export default Router;
