import Ember from 'ember';
import RenderTooltipsMixin from 'trust-enrollment/mixins/render-tooltips';

export default Ember.View.extend(RenderTooltipsMixin, {
  classNames: [ 'company-account-view', 'side-navigation-wrapper' ]
});
