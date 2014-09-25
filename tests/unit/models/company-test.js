import { test, moduleForModel } from 'ember-qunit';

moduleForModel('company', 'Company', {
  needs: [ 'model:medical-rate' ]
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(model);
});
