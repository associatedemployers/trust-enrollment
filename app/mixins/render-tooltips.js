import Ember from 'ember';

var RenderTooltips = Ember.Mixin.create({
  _scheduleTooltipRender: Ember.on('init', 'didInsertElement', function () {
    if ( this.get('selfImplementTooltips') === true ) {
      return;
    }

    // Schedule a renderTooltips for afterRender
    Ember.run.scheduleOnce('afterRender', this, this._renderTooltips);
  }),

  _renderTooltips () {
    Ember.run.scheduleOnce('afterRender', () => {
      // Get jQuery object from view, find tooltip elements, destroy
      // any existing elements and then render the tooltips
      var $tooltips = Ember.$('.tooltip-trigger');

      if ( !$tooltips || !$tooltips.tooltip ) {
        return;
      }

      $tooltips.tooltip();
    });
  }
});

export default RenderTooltips;
