import Ember from 'ember';

export default Ember.ObjectController.extend({
  promptsChanged: function () {
    var p = this.getProperties('isEditing', 'confirmDelete');

    if(p.isEditing || p.confirmDelete) {
      this.set('showingDetails', false);
    }
  }.observes('isEditing', 'confirmDelete'),

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    },
    deleteDependent: function () {
      this.get('content').deleteRecord();
    }
  }
});
