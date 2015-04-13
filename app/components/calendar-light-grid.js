import Ember from 'ember';
import renderTooltipsMixin from 'trust-enrollment/mixins/render-tooltips';

export default Ember.Component.extend(renderTooltipsMixin, {
  classNames: [ 'calendar-light-grid', 'clearfix' ],
  blocks: [],

  setBlockStyle: function () {
    this.set('blockStyle', 'width: ' + (100 / this.get('blocks.length')) + '%');
  }.observes('blocks.[]').on('didInsertElement'),

  autoSelect: function () {
    if ( !this.get('selected') ) {
      this.send('selectBlock', this.get('blocks.firstObject'));
    }
  }.observes('blocks.[]').on('didInsertElement'),

  actions: {
    selectBlock: function ( block ) {
      var blocks = this.get('blocks');

      blocks.forEach(function ( arrayBlock ) {
        Ember.set(arrayBlock, 'selected', false);
      });

      Ember.set(block, 'selected', true);
      this.set('selection', block);
    }
  }
});
