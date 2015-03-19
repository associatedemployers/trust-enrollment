import Ember from 'ember';
import layout from '../templates/components/form-input';

export default Ember.TextField.extend({
  layout: layout,
  classNames: [ 'form-control' ]
});
