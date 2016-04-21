import Ember from 'ember';
import authenticatedRouteMixin from 'trust-enrollment/mixins/authenticated-route';

export default Ember.Route.extend(authenticatedRouteMixin('employee'), {
  model () {
    return this.session.get('currentUser');
  }
});
