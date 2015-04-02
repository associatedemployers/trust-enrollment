import Ember from 'ember';
import layout from '../templates/components/nav-tab';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'li',
  classNames: [ 'tab' ]
});
