import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNames: [ 'signature-pad' ],
  attributeBindings: [ 'width', 'height' ],

  width: '800px',
  height: '200px',

  didInsertElement: function () {
    this._super.apply(this, arguments);

    this.set('signaturePad', new SignaturePad( this.$()[0] ));
    window.onresize = this._resizeCanvas;
  },

  
  _resizeCanvas: function () {
    var canvas = this.$()[0];
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  }
});
