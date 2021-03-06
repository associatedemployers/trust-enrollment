import Ember from 'ember';

export default Ember.Controller.extend({
  enrollment: Ember.inject.controller(),
  progress: Ember.computed.alias('parentController.progress'),

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    }
  }
});
