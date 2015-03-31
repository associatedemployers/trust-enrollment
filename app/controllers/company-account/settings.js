import Ember from 'ember';
import routeContextMixin from 'trust-enrollment/mixins/route-context';

export default Ember.Controller.extend(routeContextMixin, {
  routeDefinitions: {
    account:        'Account',
    communications: 'Communication Preferences'
  }
});
