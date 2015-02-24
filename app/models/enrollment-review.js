import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  submitted:   attribute('boolean'),
  approved:    attribute('boolean'),
  eventType:   attribute('string'),
  eventTitle:  attribute('string'),
  eventDate:   attribute('date'),

  attachments: DS.hasMany('file'),
  employee:    DS.belongsTo('employee'),
  notes:       DS.hasMany('note'),

  electronicSignature: attribute('string'),

  // System
  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
