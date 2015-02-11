import Ember from 'ember';

export default Ember.Mixin.create({
  /*
    Mixin setup
    NOTE: Must be implemented on init, didTransition, or didInsertElement hooks
  */
  setupWindowBindings: function () {
    $(window).on('resize scroll', { emEl: this }, this._bindToProperties);
  },

  /*
    Mixin teardown
    NOTE: Can be implemented on willTransition or willDestroyElement hooks
  */
  teardownWindowBindings: function () {
    $(window).off('resize scroll', this._bindToProperties);
  },

  _bindToProperties: function ( event ) {
    var fn = eval('event.data.emEl.windowDid' + event.type.charAt(0).toUpperCase() + event.type.slice(1));
    if(typeof fn === "function") {
      Ember.run.throttle(event.data.emEl, fn, 400);
    }
  }
});
