import Ember from 'ember';

export default Ember.Component.extend({
  noDays: Ember.computed.not('days'),
  day: null,
  month: null,
  year: null,

  _shouldCheckValue: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      Ember.run.later(this, function () {
        var val = this.get('value');

        if ( val && moment(val).isValid() ) {
          var mVal = moment(val);

          this.setProperties({
            _fromBinding: true,
            year: mVal.year(),
            month: parseFloat(mVal.month()) + 1, // Zero-indexed months w/ trailing zeros
            day: parseFloat(mVal.date()) // Removes trailing zeros
          });
        }
      }, 200);
    });
  }.on('init'),

  _shouldSetValue: function () {
    if ( this.get('_fromBinding') ) {
      return this.set('_fromBinding', false);
    }

    var dob = this.getProperties('year', 'month', 'day');
    this.set('value', ( !dob.year || !dob.month || !dob.day ) ? undefined : moment(dob.year + '/' + dob.month + '/' + dob.day, 'YYYY/MM/DD').toDate());
  }.observes('year', 'month', 'day'),

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
    
    return (!year || !month) ? null : Array.apply(null, { length: moment(year + '-' + month, 'YYYY-MM').daysInMonth() }).map(function ( v, index ) {
      return index + 1;
    });
  }.property('month', 'year'),
});
