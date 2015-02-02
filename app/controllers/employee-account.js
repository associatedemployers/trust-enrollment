import Ember from 'ember';

export default Ember.ObjectController.extend({
  showNavigation: false,
  navigationLinks: [
    {
      title: 'Summary',
      path:  'employee-account.index',
      icon:  'fa-file-text'
    }
  ],

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
