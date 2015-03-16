import Ember from 'ember';
import layout from '../templates/components/x-footer';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'footer',
  classNames: [ 'app-footer' ]
});
