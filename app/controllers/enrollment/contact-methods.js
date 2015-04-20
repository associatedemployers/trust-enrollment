import Ember from 'ember';
import formValidationMixin from 'trust-enrollment/mixins/form-validation';
import { phoneTypes } from 'trust-enrollment/config/options';

export default Ember.Controller.extend(formValidationMixin, {
  phoneTypes: phoneTypes,

  fields: [
    {
      key: 'pendingContactMethod.value',
      id: 'phone-number',
      format: function ( v ) {
        return ( v ) ? v.replace(/\D/g, '').substr(0, 10) : v;
      },
      validate: function ( v ) {
        return v && !isNaN(v) && v.length === 10;
      }
    }
  ],

  isWork: function () {
    return this.get('pendingContactMethod.type') === 'Work';
  }.property('pendingContactMethod.type'),

  _createContactMethod: function () {
    this.set('pendingContactMethod', this.store.createRecord('contactMethod'));
  }.on('init'),

  actions: {
    addContactMethod: function () {
      this.get('model.contactMethods').addObject(this.get('pendingContactMethod'));
      this._createContactMethod();
    },

    removeContactMethod: function ( contactMethod ) {
      this.get('model.contactMethods').removeObject(contactMethod);
    }
  }
});
