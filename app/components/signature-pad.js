import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: [ 'signature-pad' ],
  classNameBindings: [ 'fullscreen:signature-pad-fullscreen' ],

  width:  '800',
  height: '200',

  handoff:        false,
  handoffEnabled: true,

  didInsertElement: function () {
    this._super.apply(this, arguments);

    this.set('signaturePad', new SignaturePad( this.$('canvas.signature-pad-canvas')[0], { velocityFilterWeight: 0.75 } ));
  },

  setSvgData: function ( svgData ) {
    this.get('signaturePad').fromDataURL(svgData);
  },

  clear: function () {
    this.get('signaturePad').clear();
  },

  touchDevice: function () {
    return !!Modernizr.touch;
  }.property(),

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

    submitSignature: function () {
      this.set('transmittedHandoff', true);
      this.sendAction('submit', this.get('signaturePad').toDataURL());
    },

    clear: function () {
      this.clear();
    }
  }
});
