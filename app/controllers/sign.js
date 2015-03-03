import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    transmitHandoff: function ( svgData ) {
      this.socket.emit('signature-transmission', { svgData: svgData, verificationKey: this.get('content') });
    }
  }
});
