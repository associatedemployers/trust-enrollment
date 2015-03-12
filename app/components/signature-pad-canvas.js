import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNames: [ 'signature-pad-canvas' ],

  didInsertElement: function () {
    this._super.apply(this, arguments);

    window.onresize = this._resizeCanvas.bind(this);
    this._resizeCanvas();
  },

  fullscreenDidChange: function () {
    this._resizeCanvas();
  }.observes('fullscreen'),

  _resizeCanvas: function () {
    if ( !this.$() ) {
      return;
    }

    var canvas  = this.$()[0],
        width   = this.get('width'),
        height  = this.get('height'),
        wWidth  = $(window).width(),
        wHeight = $(window).height(),
        hHeight = $('.app-header').height(),
        fs      = this.get('fullscreen');

    var wPercent = width.indexOf('%') > -1,
        hPercent = height.indexOf('%') > -1;

    canvas.height = ( fs ) ? wHeight - hHeight : ( hPercent ) ? height.slice(0, -1) / 100 * wHeight : height;
    canvas.width  = ( fs ) ? wWidth : ( wPercent ) ? width.slice(0, -1) / 100 * wWidth : width;

    this.sendAction();
  }
});
