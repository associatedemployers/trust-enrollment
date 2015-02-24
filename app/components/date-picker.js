import Ember from 'ember';

export default Ember.Component.extend({
  tagName:    'div',
  classNames: [ 'date-picker', 'form-group' ],

  min: undefined,
  max: undefined,
  clear: 'Clear',

  _setComponentValue: function () {
    var date = moment( this.get('textValue'), 'DD MMMM, YYYY' ).toDate();
    this.set('value', date);
  },

  shouldSetComponentValue: function () {
    Ember.run.next(this, this._setComponentValue);
  }.observes('textValue').on('init'),

  didInsertElement: function () {
    this._super.apply(this, arguments);

    var settings = this.getProperties('min', 'max', 'clear');
    this.set('_jsElement', this.$().find('input.date-picker-input').pickadate( settings ));
  },

  willDestroyElement: function () {
    var $pickadate = this.get('_jsElement');

    if ( $pickadate ) {
      $pickadate.stop();
      this.set('_jsElement', null);
    }
  }
});
