import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ 'modal', 'fade' ],

  didInsertElement: function () {
    this.$().modal({
      show:     true,
      backdrop: 'static',
      keyboard: false,
    }).appendTo('body');
  },

  willDestroyElement: function () {
    $('#' + this.get('elementId')).modal('hide').one('hidden.bs.modal', function ( e ) {
      e.currentTarget.remove();
    });
  }
});
