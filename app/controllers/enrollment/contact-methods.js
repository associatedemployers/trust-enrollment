import Ember from 'ember';
import formValidationMixin from 'trust-enrollment/mixins/form-validation';
import enrollmentValidityMixin from 'trust-enrollment/mixins/enrollment-validity';
import { phoneTypes } from 'trust-enrollment/config/options';

export default Ember.Controller.extend(formValidationMixin, enrollmentValidityMixin, {
  needs: [ 'enrollment' ],
  validityNamespace: 'contact-methods',
  validityKey: 'stepIsValid',
  phoneTypes: phoneTypes,
  stepIsValid: Ember.computed.and('validity.email', 'hasContactMethod'),

  fields: [
    {
      key: 'model.email',
      id: 'email',
      format: function ( v ) {
        return ( v ) ? v.replace(/\s/g, '') : v;
      },
      validate: function ( v ) {
        return v && v.length > 3;
      }
    },
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

  hasContactMethod: function () {
    return this.get('model.contactMethods.length') > 0;
  }.property('model.contactMethods.[]'),

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
      contactMethod.destroyRecord();
    }
  }
});
