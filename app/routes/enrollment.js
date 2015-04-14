import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.createRecord('employee'); // Development
    // return this.session.get('currentUser');
  },

  actions: {
    next: function () {
      this.transitionTo('enrollment.' + this.controller.get('nextRoute.link'));
    },

    previous: function () {
      this.transitionTo('enrollment.' + this.controller.get('prevRoute.link'));
    }
  }
});
