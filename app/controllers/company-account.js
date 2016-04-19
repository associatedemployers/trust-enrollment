import Ember from 'ember';
import RenderTooltipsMixin from 'trust-enrollment/mixins/render-tooltips';

export default Ember.Controller.extend(RenderTooltipsMixin, {
  application: Ember.inject.controller(),

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
          title: 'Account',
          path: 'company-account.settings.account'
        },
        {
          title: 'Communications',
          path: 'company-account.settings.communications'
        },
        {
          title: 'Enrollment',
          path: 'company-account.settings.enrollment'
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
