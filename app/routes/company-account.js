import Ember from 'ember';
import authenticatedRouteMixin from 'trust-enrollment/mixins/authenticated-route';

export default Ember.Route.extend(authenticatedRouteMixin('company'), {
  model: function () {
    return this.session.get('currentUser');
  }
});
