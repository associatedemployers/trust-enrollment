import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'alert' ],
  classNameBindings: [ 'dismissable:alert-dismissable' ],
  attributeBindings: [ 'role' ],
  role: 'alert'
});
