import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TrustEnrollmentENV.locationType
});

Router.map(function() {
  this.resource('prototypes');
  this.resource('company-login', { path: '/login' });
});

export default Router;