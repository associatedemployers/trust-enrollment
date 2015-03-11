import Ember from 'ember';

export default Ember.View.extend({
  classNames: [ "enrollment-card" ],
  attributeBindings: [ "isActive:active", "sectionID:data-section" ],

  sectionID: function () {
    return this.get('controller.content.title');
  }.property('controller.content.title')
});