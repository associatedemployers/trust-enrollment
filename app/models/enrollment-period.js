import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  start: attribute('date'),
  end:   attribute('date'),
  super: attribute('boolean'),

  company: DS.belongsTo('company'),

  time_stamp: attribute('date'),

  // Computed
  isActive: function () {
    var now = moment(),
        e   = this.getProperties('start', 'end');

    return moment(e.start).isBefore(now) && moment(e.end).isAfter(now);
  }.property('start', 'end')
});
