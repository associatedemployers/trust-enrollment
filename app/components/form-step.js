import Ember from 'ember';
import layout from '../templates/components/form-step';

export default Ember.Component.extend({
  layout: layout,

  form: Ember.computed.alias('parentView'),

  show: function () {
    return this.get('form.step') === this.get('_formIndex');
  }.property('form.step'),

  _focus: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      console.log(this.$().find('input:first').focus());
      this.$().find('input:first')[0].focus();
    });
  }
});
