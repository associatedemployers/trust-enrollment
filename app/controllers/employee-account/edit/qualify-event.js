import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'employee-account/edit' ],

  eventSelection: Ember.computed.alias('controllers.employee-account/edit.eventSelection'),

  init: function () {
    this._super.apply(this, arguments);

    this.set('textValue', moment().format('DD MMMM, YYYY'));
  },

  dateSelectionDidChange: function () {
    console.log(this.get('dateSelection'));
  }.observes('dateSelection'),

  datePickerSettings: function () {
    var days = this.get('eventSelection.timeAfterEvent');

    return {
      min: moment().subtract( days, 'days' ).toDate(),
      max: moment().toDate()
    };
  }.property('eventSelection.timeAfterEvent')
});
