import Ember from 'ember';
import layout from '../templates/components/form-step';

export default Ember.Component.extend({
  layout: layout,

  form: Ember.computed.alias('parentView'),

  show: function () {
    return this.get('form.step') === this.get('_formIndex');
  }.property('form.step'),

  _focus: function () {
    if ( this.get('autofocus') === false ) {
      return;
    }

    Ember.run.scheduleOnce('afterRender', this, function () {
      var $input = this.$().find('input:first') || this.$().find('select:first');

      if ( $input ) {
        $input.focus();
      }
    });
  }
});
