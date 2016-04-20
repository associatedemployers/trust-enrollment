import Ember from 'ember';

export default Ember.Controller.extend({
  'employee-account/edit': Ember.inject.controller(),
  'employee-account/edit/qualify-event': Ember.inject.controller(),

  eventSelection: Ember.computed.alias('employee-account/edit.eventSelection'),
  dateSelection:  Ember.computed.alias('employee-account/edit/qualify-event.dateSelection'),

  notAgreed: Ember.computed.not('agreement')
});
