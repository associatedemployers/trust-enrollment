import Ember from 'ember';
import EnrollmentValidityMixin from '../../../mixins/enrollment-validity';
import { module, test } from 'qunit';

module('EnrollmentValidityMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var EnrollmentValidityObject = Ember.Object.extend(EnrollmentValidityMixin);
  var subject = EnrollmentValidityObject.create();
  assert.ok(subject);
});
