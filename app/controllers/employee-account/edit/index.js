import Ember from 'ember';
import events from 'trust-enrollment/config/events';

export default Ember.Controller.extend({
  needs: [ 'employee-account/edit' ],

  eventButtons: events,

  activeEnrollmentPeriod: Ember.computed.alias('controllers.employee-account/edit.activeEnrollmentPeriod'),
  nextEnrollmentPeriod:   Ember.computed.alias('controllers.employee-account/edit.nextEnrollmentPeriod'),
  eventSelection:         Ember.computed.alias('controllers.employee-account/edit.eventSelection')
});
