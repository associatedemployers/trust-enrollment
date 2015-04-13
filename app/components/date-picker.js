import Ember from 'ember';

export default Ember.Component.extend({
  tagName:       'div',
  classNames:    [ 'date-picker', 'form-group' ],
  inputSelector: 'input.date-picker-input',

  min: undefined,
  max: undefined,
  clear: 'Clear',

  _setComponentValue: function () {
    this.set('value', ( this.get('textValue') ) ? moment( this.get('textValue'), 'DD MMMM, YYYY' ).toDate() : this.get('textValue'));
  },

  shouldSetDisableRange: function () {
    if ( !this.get('_jsElement') ) {
      return;
    }

    var picker = this.$().find(this.get('inputSelector')).pickadate('picker');

    picker.set('enable', false);
    picker.set('disable', this.get('disable'));
  }.observes('disable'),

  shouldSetComponentValue: function () {
    Ember.run.next(this, this._setComponentValue);
  }.observes('textValue').on('init'),

  _renderElement: function () {
    var settings = this.getProperties('min', 'max', 'clear', 'disable');
    settings.container = this.get('pickerContainer');

    this.set('_jsElement', this.$().find(this.get('inputSelector')).pickadate( settings ));        
  }.on('didInsertElement'),

  willDestroyElement: function () {
    var $pickadate = this.get('_jsElement');

    if ( $pickadate ) {
      $pickadate.stop();
      this.set('_jsElement', null);
    }
  }
});
