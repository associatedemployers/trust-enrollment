import Ember from 'ember';

var RenderTooltips = Ember.Mixin.create({
  didInsertElement: function () {
    this._super();

    if ( this.get('selfImplementTooltips') === true ) {
      return;
    }

    // Schedule a renderTooltips for afterRender
    Ember.run.scheduleOnce('afterRender', this, this._renderTooltips);
  },

  _renderTooltips: function () {
    // Get jQuery object from view, find tooltip elements, destroy
    // any existing elements and then render the tooltips
    var $tooltips = this.$().find('.tooltip-trigger');

    $tooltips.tooltip('destroy');
    $tooltips.tooltip();
  }
});

export default RenderTooltips;
