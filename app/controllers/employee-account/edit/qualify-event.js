import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'employee-account/edit' ],

  eventSelection: Ember.computed.alias('controllers.employee-account/edit.eventSelection'),
  dateSelection:  null,

  init: function () {
    this._super.apply(this, arguments);

    this.set('textValue', moment().format('DD MMMM, YYYY'));
  },

  datePickerSettings: function () {
    var days = this.get('eventSelection.timeAfterEvent');

    return {
      min: moment().subtract( days, 'days' ).toDate(),
      max: moment().toDate()
    };
  }.property('eventSelection.timeAfterEvent')
});
