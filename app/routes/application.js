import Ember from 'ember';

var ApplicationRoute = Ember.Route.extend({
  actions: {
    showModal ( id, staticModal, forceAppend ) {
      // Assign the modal element to a variable
      var el = $('#' + id),
          previousModal = this.get('previousModal');
      // If the forceAppend variable exists, we will append it to that identifer; useful for nested view modals
      if (forceAppend) {
        // Reassign the element
        el = el.appendTo(forceAppend);
      }
      // If we are going to be rendering this as a static, non-dismissable modal, set those properties
      if (staticModal) {
        el.modal({
          keyboard: false,
          backdrop: 'static',
          show: false
        });
      }

      var showTheModal = () => {
        el.modal('show');
        this.set('previousModal', el);
      };

      if (previousModal) {
        return previousModal.one('hidden.bs.modal', showTheModal);
      }

      showTheModal();
    },

    hideModal ( id ) {
      var self = this;

      $('#' + id).modal('hide').one('hidden.bs.modal', function() {
        self.set('previousModal', null);
      });
    },

    logout () {
      this.session.get('destroySession')();
    }
  }
});

export default ApplicationRoute;
