import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: [ 'application' ],

  showNavigation: false,
  navigationLinks: [
    {
      title: 'View Summary',
      path:  'employee-account.index',
      icon:  'fa-file-text-o'
    },
    {
      title: 'Change Info & Coverage',
      path:  'employee-account.edit',
      icon:  'fa-pencil-square-o'
    },
    {
      title: 'View Plan Documents',
      path:  'employee-account.documents',
      icon:  'fa-folder-open-o'
    }
  ],

  currentPathDidChange: function () {
    // Hide Side-Navigation on route change
    this.set('showNavigation', false);
  }.observes('controllers.application.currentPath'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
