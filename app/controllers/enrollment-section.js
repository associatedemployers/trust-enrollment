import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],

  /* Aliases */
  states: Ember.computed.alias('controllers.application.states'),
  // We need to directly bind to the parent controller
  // content here because the render helper doesn't allow
  // us to bind properties. Take that, render helper.
  enrollment: Ember.computed.alias('parentController.content'),

  /* Computed */
  // Simple year generator
  years: function () {
    var years = [];
    for (var i = moment().year(); i > 1900 ; i--) {
      years.push(i);
    }
    return years;
  }.property(),

  months: function () {
    var months = [];
    for (var i = 1; i < 13 ; i++) {
      months.push(i);
    }
    return months;
  }.property()
});