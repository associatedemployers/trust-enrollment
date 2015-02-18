import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'p',
  classNames: [ 'error-display', 'text-center', 'text-danger' ],
  classNameBindings: [ 'bg:error-display-background', 'message::hidden' ],
  bg: true
});
