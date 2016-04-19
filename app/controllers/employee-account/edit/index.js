import Ember from 'ember';
import events from 'trust-enrollment/config/events';
import eventFunctions from 'trust-enrollment/config/event-functions';

export default Ember.Controller.extend({
  'employee-account/edit': Ember.inject.controller(),
  events: events,
  activeEnrollmentPeriod: Ember.computed.alias('employee-account/edit.activeEnrollmentPeriod'),
  nextEnrollmentPeriod:   Ember.computed.alias('employee-account/edit.nextEnrollmentPeriod'),
  eventSelection:         Ember.computed.alias('employee-account/edit.eventSelection'),

  eventsQualified: function () {
    var employee = this.get('content'),
        self     = this;

    return this.get('events').filter(function ( e ) {
      var fns = eventFunctions[ e.code ],
          qualifyFn = ( fns ) ? fns.qualify : null;

      return ( qualifyFn && typeof qualifyFn === 'function' ) ? qualifyFn.call(self, employee) : true;
    });
  }.property('content', 'events')
});
