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

  /* Computed */
  noDays: Ember.computed.not('days'),

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
  }.property(),

  days: function () {
    var year = this.get('enrollment.dob_year'),
        month = this.get('enrollment.dob_month');
    
    return (!year || !month) ? null : Array.apply(null, { length: moment(year + "-" + month, "YYYY-MM").daysInMonth() }).map(function (v, index) {
      return index + 1;
    });
  }.property('enrollment.dob_month', 'enrollment.dob_year'),

  isMarried: function () {
    return this.get('enrollment.marital') === "married";
  }.property('enrollment.marital')
});