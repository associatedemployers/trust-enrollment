import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],

  /* Aliases */
  states:           Ember.computed.alias('controllers.application.states'),
  suffixes:         Ember.computed.alias('controllers.application.suffixes'),
  genders:          Ember.computed.alias('controllers.application.genders'),
  marital_statuses: Ember.computed.alias('controllers.application.marital_statuses'),
  validity:         Ember.computed.alias('parentController.validity'),
  // We need to directly bind to the parent controller
  // content here because the render helper doesn't allow
  // us to bind properties. Take that, render helper.
  enrollment:       Ember.computed.alias('parentController.content'),

  isMarried: function () {
    return this.get('enrollment.marital') === "Married";
  }.property('enrollment.marital'),

  maritalStatusDidChange: function () {
    if(this.get('isMarried')) {
      this.get('enrollment').set('noDependents', false);
    }
  }.observes('isMarried'),

  actions: {
    answerDependentQuestion: function (answer) {
      this.set('dependentQuestionDismissed', true);
      this.get('enrollment').set('noDependents', !answer);
    }
  }
});