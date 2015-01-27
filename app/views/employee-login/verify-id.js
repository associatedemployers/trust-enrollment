import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ 'modal', 'fade' ],

  didInsertElement: function () {
    this.$().modal({
      show:     true,
      backdrop: 'static',
      keyboard: false
    });
  },

  willDestroyElement: function () {
    this.$().modal('hide');
  }
});
