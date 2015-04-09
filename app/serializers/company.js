import DS from 'ember-data';
import ApplicationSerializer from './application';
import serializeObject from 'trust-enrollment/utils/serialize-object';

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
      serializeObject(hash, true, 'name', 'contact', 'address', 'contribution', 'notifications');
      serializeObject(hash, false, 'login');

      return hash;
    }
  }
});
