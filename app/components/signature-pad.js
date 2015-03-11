import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: [ 'signature-pad' ],
  classNameBindings: [ 'fullscreen:signature-pad-fullscreen' ],

  displayHandoffDialog: Ember.computed.and('notTouchDevice', 'handoffEnabled', 'notHandoff'),
  notTouchDevice:       Ember.computed.not('touchDevice'),
  notHandoff:           Ember.computed.not('handoff'),

  width:  '800',
  height: '200',

  handoff:        false,
  handoffEnabled: true,
  isEmpty:        true,

  didInsertElement: function () {
    this._super.apply(this, arguments);

    this.set('signaturePad', new SignaturePad( this.$('canvas.signature-pad-canvas')[0], {
      velocityFilterWeight: 0.75,
      onBegin: this._strokeStart.bind(this),
      onEnd: this._strokeEnd.bind(this)
    }));
  },

  setSvgData: function ( svgData ) {
    this.get('signaturePad').fromDataURL(svgData);
  },

  clear: function () {
    if ( this.get('signaturePad') ) {
      this.get('signaturePad').clear();
    }

    this.set('isEmpty', true);
  },

  touchDevice: function () {
    return !!Modernizr.touch;
  }.property(),

  _strokeStart: function () {
    this.set('isSigning', true);
  },

  _strokeEnd: function () {
    this.setProperties({
      isEmpty: this.get('signaturePad').isEmpty(),
      isSigning: false
    });
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
      this.socket.get('connection').emit('signature-handoff', { user: this.session.get('currentUser.id') });
      this.socket.get('connection').on('signature-push', this.__receiveSignature.bind(this));
      this.socket.get('connection').on('signature-verification', function ( data ) {
        self.setProperties({
          registeringHandoff: false,
          pendingHandoff:     true,
          handoffId:          data
        });
      });
    },

    transmitSignature: function () {
      this.socket.get('connection').emit('signature-transmission', {
        svgData: this.get('signaturePad').toDataURL(),
        verificationKey: this.get('handoffVerificationKey')
      });
      this.set('transmittedHandoff', true);
    },

    submitSignature: function () {
      this.sendAction(this.get('signaturePad').toDataURL());
    },

    clear: function () {
      this.clear();
    }
  }
});
