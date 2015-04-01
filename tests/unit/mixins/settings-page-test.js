import Ember from 'ember';
import SettingsPageMixin from '../../../mixins/settings-page';
import { module, test } from 'qunit';

module('SettingsPageMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var SettingsPageObject = Ember.Object.extend(SettingsPageMixin);
  var subject = SettingsPageObject.create();
  assert.ok(subject);
});
