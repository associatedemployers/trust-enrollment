import Ember from 'ember';
import RenderTooltipsMixin from '../mixins/render-tooltips';

export default Ember.View.extend(RenderTooltipsMixin, {
  classNames: [ 'dependents' ],

  shouldRenderTooltips: function () {
    if(this.get('controller.isSpouse')) {
      Ember.run.scheduleOnce('afterRender', this, this._renderTooltips);
    }
  }.observes('controller.isSpouse')
});