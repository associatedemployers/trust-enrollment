import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'nav',
  templateName: 'header',
  //classNames: [ 'app-header' ],
  classNameBindings: [ ':app-header', 'controller.onIndex:fill-primary' ]
});