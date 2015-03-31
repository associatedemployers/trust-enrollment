import Ember from 'ember';
import routeContextMixin from 'trust-enrollment/mixins/route-context';

export default Ember.Controller.extend(routeContextMixin, {
  routeDefinitions: {
    bulk: 'New Employees',
    index: 'New Employee'
  }
});
