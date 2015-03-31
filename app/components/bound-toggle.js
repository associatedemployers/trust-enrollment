import Ember from 'ember';
import layout from '../templates/components/bound-toggle';

export default Ember.Component.extend({
  layout: layout,
  classNames: [ 'form-group', 'text-center', 'toggle-view' ],
  theme: 'squish', // default theme

  inputId: function () {
    return 'tglinput-' + this.get('elementId');
  }.property('elementId'),

  toggleClass: function () {
    return 'toggle toggle-' + this.get('theme');
  }.property('theme')
});
