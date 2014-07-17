import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'progress' ],
  
  // Defaults
  min: 0,
  max: 0,

  // Computed
  style: function () {
    var width = this.get('progress') || 0;
    return "width: " + width + "%;";
  }.property('progress')
});