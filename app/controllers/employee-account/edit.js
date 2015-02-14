import Ember from 'ember';

export default Ember.Controller.extend({
  activeEnrollmentPeriod: null,
  nextEnrollmentPeriod:   null,
  eventSelection:         null,

  getActiveEnrollmentPeriod: function () {
    var self = this;

    this.session.get('enrollmentPeriods').then(function ( enrollmentPeriods ) {
      self.set('activeEnrollmentPeriod', enrollmentPeriods.findBy('isActive', true));
    });
  }.observes('session.enrollmentPeriods.@each.isActive').on('init'),

  getNextEnrollmentPeriod: function () {
    var self = this,
        now  = moment();

    var nextPeriod = function ( item ) {
      return moment( item.get('start') ).isAfter( now );
    };

    this.session.get('enrollmentPeriods').then(function ( enrollmentPeriods ) {
      self.set('nextEnrollmentPeriod', enrollmentPeriods.sortBy('start').find(nextPeriod));
    });
  }.observes('session.enrollmentPeriods.@each.start').on('init')
});
