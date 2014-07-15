import Ember from 'ember';

export default Ember.View.extend({
  templateName: "enrollment-section",
  classNames: [ "enrollment-card" ],
  attributeBindings: [ "isActive:active" ]
});