import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'progress' ],
  classNameBindings: [ 'striped:progress-striped', 'animated:active' ],

  min: 0,
  max: 0,
  barClass: 'progress-bar-success',

  // Computed
  style: function () {
    var width = this.get('value') || 0;
    return "width: " + width + "%;";
  }.property('value')
});

// Usage:
// {{progress-bar min=0 max=100 value=50 striped=true animated=true barClass="progress-bar-primary"}}
