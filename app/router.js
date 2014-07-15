import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TrustEnrollmentENV.locationType
});

Router.map(function() {
  this.route('prototypes');
  this.route('company-login', { path: '/login' });
  this.route('enrollment', { path: '/enroll' });
});

export default Router;