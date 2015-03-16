import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: [ 'employee-account/edit', 'employee-account/edit/qualify-event' ],

  eventSelection: Ember.computed.alias('controllers.employee-account/edit.eventSelection'),
  dateSelection:  Ember.computed.alias('controllers.employee-account/edit/qualify-event.dateSelection'),

  notAgreed: Ember.computed.not('agreement')
});
