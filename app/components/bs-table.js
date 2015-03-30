import Ember from 'ember';
import layout from '../templates/components/bs-table';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'table',
  classNames: [ 'table' ],
  classNameBindings: [ 'striped:table-striped', 'border:table-bordered', 'hover:table-hover' ]
});
