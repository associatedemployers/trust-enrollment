import Ember from 'ember';
import renderTooltips from 'trust-enrollment/mixins/render-tooltips';

export default Ember.ObjectController.extend({
  application: Ember.inject.controller(),

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

  // Computed
  lastLoginDescription: function () {
    var login = this.get('content.lastLogin');

    return ( !login ) ? 'Last Login: Now' : 'Last Login: %@'.fmt( moment(login.time_stamp).format('M/D/YY') );
  }.property('content.lastLogin.[]'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    }
  }
});
