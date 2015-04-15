import Ember from 'ember';
import formValidationMixin from 'trust-enrollment/mixins/form-validation';
import { suffixes, states } from 'trust-enrollment/config/options';
import titleCase from 'trust-enrollment/utils/title-case';

export default Ember.Controller.extend(formValidationMixin, {
  suffixes: suffixes,
  states: states,

  genericFieldFormatter: titleCase,

  fields: [
    {
      key: 'model.firstName',
      id: 'first-name'
    },
    {
      key: 'model.middleInitial',
      id: 'middle-initial'
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
      id: 'address-zipcode'
    }
  ],

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
