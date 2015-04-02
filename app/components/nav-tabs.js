import Ember from 'ember';
import layout from '../templates/components/nav-tabs';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ul',
  classNames: [ 'nav nav-tabs' ],
  role: 'tablist',
  attributeBindings: [ 'role' ]
});
