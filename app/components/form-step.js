import Ember from 'ember';
import layout from '../templates/components/form-step';

export default Ember.Component.extend({
  layout: layout,

  form: Ember.computed.alias('parentView'),

  show: function () {
    return this.get('form.step') === this.get('_formIndex');
  }.property('form.step')
});
