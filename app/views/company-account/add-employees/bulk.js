import Ember from 'ember';
import RenderTooltipsMixin from 'trust-enrollment/mixins/render-tooltips';

export default Ember.View.extend(RenderTooltipsMixin, {
  shouldRenderTooltips: function () {
    Ember.run.scheduleOnce('afterRender', this, this._renderTooltips);
  }.observes('controller.parsedArray')
});
