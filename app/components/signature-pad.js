import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNames: [ 'signature-pad' ],
  attributeBindings: [ 'width', 'height' ],

  width:          '800px',
  height:         '200px',
  handoff:        false,
  handoffEnabled: true,

  didInsertElement: function () {
    this._super.apply(this, arguments);

    if ( this.get('fullscreen') ) {
      this.setProperties({
        width: '100%',
        height: '100%'
      });
    }

    this.set('signaturePad', new SignaturePad( this.$()[0] ));
    window.onresize = this._resizeCanvas.bind(this);
    this._resizeCanvas();
  },

  setSvgData: function ( svgData ) {
    this.get('signaturePad').fromDataURL(svgData);
  },

  clear: function () {
    this.get('signaturePad').clear();
  },

  _resizeCanvas: function () {
    var canvas = this.$()[0];
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  },

  // Socket Events
  __receiveSignature: function ( data ) {
    this.setSvgData(data.svgData);
    this.setProperties({
      pendingHandoff:  false,
      receivedHandoff: true
    });
  },

  actions: {
    registerHandoff: function () {
      var self = this;

      this.set('registeringHandoff', true);
      this.socket.emit('signature-handoff', { user: this.session.get('currentUser.id') });
      this.socket.on('signature-push', this.__receiveSignature.bind(this));
      this.socket.on('signature-registered', function ( /* data */ ) {
        self.setProperties({
          registeringHandoff: false,
          pendingHandoff:     true
        });
      });
    },

    transmitHandoffData: function () {
      this.setProperties({
        transmittingHandoff: true,
        transmittedHandoff: true
      });
      this.send('transmitHandoff', this.get('signaturePad').toDataURL());
    }
  }
});
