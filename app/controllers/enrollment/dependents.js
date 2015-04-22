import Ember from 'ember';
import formValidationMixin from 'trust-enrollment/mixins/form-validation';
import enrollmentValidityMixin from 'trust-enrollment/mixins/enrollment-validity';
import { suffixes, states } from 'trust-enrollment/config/options';
import titleCase from 'trust-enrollment/utils/title-case';

export default Ember.Controller.extend(formValidationMixin, enrollmentValidityMixin, {
  validityNamespace: 'dependents',
  validityKey: 'formIsValid',
  suffixes: suffixes,
  states: states,

  genericFieldFormatter: titleCase,

  fields: [
    {
      key: 'pendingRecord.firstName',
      id: 'dependent-first-name'
    },
    {
      key: 'pendingRecord.middleInitial',
      id: 'dependent-middle-initial',
      processValidity: false,
      format: function ( v ) {
        return ( v ) ? v.substr(0, 1) : v;
      }
    },
    {
      key: 'pendingRecord.lastName',
      id: 'dependent-last-name'
    },
    {
      key: 'pendingRecord.relationship',
      id: 'dependent-relationship'
    },
    {
      key: 'pendingRecord.gender',
      id: 'dependent-gender'
    },
    {
      key: 'pendingRecord.dateOfBirth',
      id: 'dependent-dob',
      useGenericFormatter: false,
      validate: function ( v ) {
        return v && moment(v).isValid();
      }
    },
    {
      key: 'pendingRecord.addressLine1',
      id: 'dependent-address-line-1',
      processValidity: false
    },
    {
      key: 'pendingRecord.addressCity',
      id: 'dependent-address-city',
      processValidity: false
    },
    {
      key: 'pendingRecord.addressZipcode',
      id: 'dependent-address-zipcode',
      processValidity: false,
      useGenericFormatter: false,
      format: function ( v ) {
        return ( v ) ? v.replace(/\D/g, '').substr(0, 5) : v;
      }
    },
    {
      key: 'pendingRecord.ssn',
      id: 'dependent-ssn',
      useGenericFormatter: false,
      format: function ( v ) {
        return ( v && !this.get('dependentNoSsn') ) ? v.replace(/\D/g, '').substr(0, 9) : v;
      },
      validate: function ( v ) {
        return this.get('dependentNoSsn') || v && v.length === 9;
      }
    }
  ],

  formIsValid: function () {
    if ( !this.get('model.isMarried') ) {
      return true;
    }

    return !!this.get('model.dependents').findBy('relationship', 'Spouse');
  }.property('model.isMarried', 'model.dependents.@each.relationship'),

  dependentNoSsnDidChange: function () {
    if ( !this.get('pendingRecord') ) {
      return;
    }

    this.set('pendingRecord.ssn', null);
    this.notifyPropertyChange('pendingRecord.ssn');
  }.observes('dependentNoSsn'),

  removeRelationshipOptions: function () {
    var dependents      = this.get('model.dependents'),
        spouse          = dependents.findBy('relationship', 'Spouse'),
        domesticPartner = dependents.findBy('relationship', 'Domestic Partner'),
        maritalStatus   = this.get('model.maritalStatus');

    if ( maritalStatus === 'Single' && !domesticPartner ) {
      return 'Spouse';
    } else if ( spouse || domesticPartner ) {
      return [ 'Spouse', 'Domestic Partner' ];
    } else if ( maritalStatus === 'Married' ) {
      return 'Domestic Partner';
    }
  }.property('model.maritalStatus', 'model.dependents.@each.relationship'),

  _resetForm: function () {
    this.setProperties({
      pendingRecord: null,
      pendingRecordIsLive: null,
      dependentNoSsn: false,
      dependentSpecificAddress: false
    });
  },

  actions: {
    addDependent: function () {
      var record = this.store.createRecord('dependent');
      this.set('pendingRecord', record);
    },

    saveDependent: function () {
      var record = this.get('pendingRecord');
      record.set('employee', this.get('model'));
      this._resetForm();
    },

    editDependent: function ( dependent ) {
      if ( this.get('pendingRecord.isDirty') && !confirm('Are you sure you want to abandon progress on adding a new dependent to edit?') ) {
        return;
      }

      this.setProperties({
        pendingRecordIsLive: true,
        pendingRecord: dependent,
        dependentNoSsn: !dependent.get('ssn'),
        dependentSpecificAddress: !!dependent.get('addressLine1')
      });
    },

    removeDependent: function ( dependent ) {
      if ( !confirm(( this.get('pendingRecordIsLive') ) ? 'Are you sure you want to delete ' + dependent.get('firstName') + ' from your dependents?' : 'Are you sure you want to cancel?') ) {
        return;
      }

      dependent.destroyRecord();

      if ( !this.get('pendingRecordIsLive') ) {
        this._resetForm();
      }
    }
  }
});
