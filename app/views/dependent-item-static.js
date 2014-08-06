import Ember from 'ember';
import RenderTooltipsMixin from '../mixins/render-tooltips';

export default Ember.View.extend(RenderTooltipsMixin, {
  templateName: 'dependent-item-static',
  classNames: [ 'list-group-item', 'dependent' ]
});
