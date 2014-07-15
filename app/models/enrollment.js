import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  // Name
  name_first: attribute('string'),
  name_mi:    attribute('string'),
  name_last:  attribute('string'),

  // Address
  address_line1:   attribute('string'),
  address_line2:   attribute('string'),
  address_city:    attribute('string'),
  address_state:   attribute('string'),
  address_zipcode: attribute('number'),

  // Personal Info
  dob_day:   attribute('number'),
  dob_month: attribute('number'),
  dob_year:  attribute('number'),
  dob: function () {
    var m = this;
    return m.get('dob_year') + "/" + m.get('dob_month') + "/" + m.get('dob_day');
  }.property('dob_day', 'dob_month', 'dob_year')
});