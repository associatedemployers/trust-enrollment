import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [ 'formGroup:form-group', 'textAddon:right-inner-text-addon', 'valid:valid' ],
  formGroup: true,
  textAddon: true
});
