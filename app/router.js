import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('employee-login', { path: '/employee/login' }, function () {
    this.route('verify-id', { path: '/verify-membership/:token' });
  });

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

  this.route('company-login', { path: '/company/login' });
  this.route('enrollment', { path: '/enroll' });
  this.route('sign', { path: '/sign/:handoffId' });

  this.route('faq', { path: '/frequently-asked-questions' }, function () {
    this.route('index', { path: '/' });
    this.route('single', { path: '/:id' });
  });
});

export default Router;
