import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    lastLogin:      { embedded: 'always' },
    medicalRates:   { deserialize: 'records', serialize: 'ids' },
    dentalRates:    { deserialize: 'records', serialize: 'ids' },
    visionRates:    { deserialize: 'records', serialize: 'ids' },
    lifeRates:      { deserialize: 'records', serialize: 'ids' }
  },

  normalizeHash: {
    company: function ( hash ) {
      if( hash.name ) {
        hash.companyName = hash.name.company;

        delete hash.name;
      }

      if ( hash.contact ) {
        hash.contactName  = hash.contact.name;
        hash.contactPhone = hash.contact.phone;
        hash.contactFax   = hash.contact.fax;

        delete hash.contact;
      }

      if( hash.address ) {
        hash.addressLine1 = hash.address.line1;
        hash.addressLine2 = hash.address.line2;
        hash.city         = hash.address.city;
        hash.state        = hash.address.state;
        hash.zipcode      = hash.address.zipcode;

        delete hash.address;
      }

      if ( hash.login ) {
        hash.companyId = hash.login.companyId;
        hash.email     = hash.login.email;

        delete hash.login;
      }

      if ( hash.contribution ) {
        hash.contributionEnabled      = hash.contribution.enabled;
        hash.contributionOnRates      = hash.contribution.onRates;
        hash.contributionEmployee     = hash.contribution.employee.amount;
        hash.contributionEmployeeType = hash.contribution.employee.type;
        hash.contributionSpouse       = hash.contribution.spouse.amount;
        hash.contributionSpouseType   = hash.contribution.spouse.type;
        hash.contributionChildren     = hash.contribution.children.amount;
        hash.contributionChildrenType = hash.contribution.children.type;

        delete hash.contribution;
      }

      return hash;
    }
  }
});
