import Ember from 'ember';
import AuthenticatedRouteMixin from 'trust-enrollment/mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return this.session.get('currentUser');
  }
});
