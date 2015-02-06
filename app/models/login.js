import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  ip:         attribute('string'),
  time_stamp: attribute('date')
});
