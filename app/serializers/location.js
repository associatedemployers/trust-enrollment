import ApplicationSerializer from './application';
import serializeObject from 'trust-enrollment/utils/serialize-object';

export default ApplicationSerializer.extend({
  normalizeHash: {
    location: function ( hash ) {
      serializeObject(hash, true, 'address');
      serializeObject(hash, false, 'contact');

      return hash;
    }
  }
});
