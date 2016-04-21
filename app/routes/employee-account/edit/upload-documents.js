import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var editController    = this.controllerFor('employee-account.edit'),
        qualifyController = this.controllerFor('employee-account.edit.qualify-event');

    if ( !editController.get('eventSelection') || !qualifyController.get('dateSelection') ) {
      this.transitionTo('employee-account.edit.index');
    }

    if ( editController.get('eventSelection.requiresSupport') === false ) {
      this.transitionTo('employee-account.edit.review', this.store.createRecord('enrollment-review', {
        employee:   this.session.get('currentUser'),
        eventType:  editController.get('eventSelection.code'),
        eventTitle: editController.get('eventSelection.title'),
        eventDate:  qualifyController.get('dateSelection')
      }));
    }
  }
});
