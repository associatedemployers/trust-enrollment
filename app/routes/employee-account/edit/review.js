import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var editController    = this.controllerFor('employee-account/edit'),
        qualifyController = this.controllerFor('employee-account/edit/qualify-event');

    if ( !editController.get('eventSelection') || !qualifyController.get('dateSelection') ) {
      this.transitionTo('employee-account.edit.index');
    }
  }
});
