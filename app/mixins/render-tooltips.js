import Ember from 'ember';

var RenderTooltips = Ember.Mixin.create({
  init: function () {
    // Don't override
    this._super();
    // Schedule a callback for afterRender
    Ember.run.scheduleOnce('afterRender', this, function () {
      // Get jQuery object from view, find tooltip elements, and then render the tooltips
      this.$().find('.tooltip-trigger').tooltip();
    });
  }
});

export default RenderTooltips;