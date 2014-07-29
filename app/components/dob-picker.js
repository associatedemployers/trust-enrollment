import Ember from 'ember';

export default Ember.Component.extend({
  noDays: Ember.computed.not('days'),

  // Year generator
  years: function () {
    var years = [];
    for (var i = moment().year(); i > 1900 ; i--) {
      years.push(i);
    }
    return years;
  }.property(),

  // Month generator
  months: function () {
    var months = [];
    for (var i = 1; i < 13 ; i++) {
      months.push(i);
    }
    return months;
  }.property(),

  // Conditional day generator
  days: function () {
    var year = this.get('year'),
        month = this.get('month');
    
    return (!year || !month) ? null : Array.apply(null, { length: moment(year + "-" + month, "YYYY-MM").daysInMonth() }).map(function (v, index) {
      return index + 1;
    });
  }.property('month', 'year'),
});