import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: [ 'style' ],
  classNames: [ 'viewport-max' ],
  style: '',

  calculateStyle: function () {
    console.log(this.$().offset().top);
    this.set('style', 'min-height: ' + Math.ceil(( $( window ).innerHeight() - this.$().offset().top ) + 5) + 'px');
  }.on('didInsertElement')
});
