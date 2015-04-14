import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'enrollment-card' ],
  classNameBindings: [ 'active' ],
  attributeBindings: [ 'data-section' ]
});
