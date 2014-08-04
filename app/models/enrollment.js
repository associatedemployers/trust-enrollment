import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  // Name
  firstName:      attribute('string'),
  middleInitial:  attribute('string'),
  lastName:       attribute('string'),

  // Address
  addressLine1:   attribute('string'),
  addressLine2:   attribute('string'),
  addressCity:    attribute('string'),
  addressState:   attribute('string'),
  addressZipcode: attribute('number'),

  // Personal Info
  dobDay:         attribute('number'),
  dobMonth:       attribute('number'),
  dobYear:        attribute('number'),
  
  // Relational
  dependents:     DS.hasMany('dependent'),

  // Computed
  dob: function () {
    var m = this;
    return m.get('dob_year') + "/" + m.get('dob_month') + "/" + m.get('dob_day');
  }.property('dob_day', 'dob_month', 'dob_year')
});