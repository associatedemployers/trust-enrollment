import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],

  navigationLinks: [
    {
      title: 'Summary',
      path:  'company-account.index',
      icon:  'fa-bar-chart'
    },
    {
      title: 'Employees',
      path:  'company-account.employees',
      icon:  'fa-users',
      subLinks: [
        {
          title: 'Add Employees',
          path: 'company-account.add-employees'
        }
      ]
    },
    {
      title: 'Forms',
      path:  'company-account.forms',
      icon:  'fa-file-text'
    },
    {
      title: 'Settings',
      path:  'company-account.settings',
      icon:  'fa-gears',
      subLinks: [
        {
          title: 'Communication Preferences',
          path: 'company-account.settings.communications'
        }
      ]
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
