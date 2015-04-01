import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    willTransition: function ( transition ) {
      if ( this.controller.get('model.isDirty') ) {
        if ( !confirm('All changes will be discarded. Are you sure you want to do this?') ) {
          transition.abort();
        } else {
          this.controller.get('model').rollback();
        }
      }
    }
  }
});
