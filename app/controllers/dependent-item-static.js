import Ember from 'ember';
import renderTooltips from 'trust-enrollment/mixins/render-tooltips';

export default Ember.Controller.extend(renderTooltips, {
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
