import Ember from 'ember';
import renderTooltipsMixin from 'trust-enrollment/mixins/render-tooltips';

export default Ember.View.extend(renderTooltipsMixin, {
  classNames: [ 'enrollment-view' ],

  shouldRenderTooltips: function () {
    this._renderTooltips();
  }.observes('controller.currentRoute', 'controller.currentRoute.isValid')
});
