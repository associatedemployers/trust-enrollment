import Ember from 'ember';
import FormValidationMixin from '../../../mixins/form-validation';
import { module, test } from 'qunit';

module('FormValidationMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var FormValidationObject = Ember.Object.extend(FormValidationMixin);
  var subject = FormValidationObject.create();
  assert.ok(subject);
});
