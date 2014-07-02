import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TrustEnrollmentENV.locationType
});

Router.map(function () {
  this.resource('prototypes');
});

export default Router;