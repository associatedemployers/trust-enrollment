import Ember from 'ember';
import formValidationMixin from 'trust-enrollment/mixins/form-validation';
import enrollmentValidityMixin from 'trust-enrollment/mixins/enrollment-validity';
import { suffixes, states, maritalStatuses } from 'trust-enrollment/config/options';
import titleCase from 'trust-enrollment/utils/title-case';

export default Ember.Controller.extend(formValidationMixin, enrollmentValidityMixin, {
  validityNamespace: 'about',
  suffixes: suffixes,
  states: states,
  maritalStatuses: maritalStatuses,

  genericFieldFormatter: titleCase,

  fields: [
    {
      key: 'model.firstName',
      id: 'first-name'
    },
    {
      key: 'model.middleInitial',
      id: 'middle-initial',
      processValidity: false,
      format: function ( v ) {
        return ( v ) ? v.substr(0, 1) : v;
      }
    },
    {
      key: 'model.lastName',
      id: 'last-name'
    },
    {
      key: 'model.addressLine1',
      id: 'address-line-1'
    },
    {
      key: 'model.addressCity',
      id: 'address-city'
    },
    {
      key: 'model.addressZipcode',
      id: 'address-zipcode',
      useGenericFormatter: false,
      validate: function ( v ) {
        return v && !isNaN(v) && v.length === 5;
      },
      format: function ( v ) {
        return ( v ) ? v.replace(/\D/g, '').substr(0, 5) : v;
      }
    },
    {
      key: 'model.gender',
      id: 'info-gender'
    },
    {
      key: 'model.maritalStatus',
      id: 'info-marital'
    },
    {
      key: 'model.dateOfBirth',
      id: 'dob-year',
      useGenericFormatter: false,
      validate: function ( v ) {
        return v && moment(v).isValid();
      }
    }
  ],

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
