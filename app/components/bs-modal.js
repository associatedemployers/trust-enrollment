import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'modal', 'fade' ],
  attributeBindings: [ 'id' ],

  _toggleShow: Ember.on('didInsertElement', Ember.observer('showModal', function () {
    var parentClass = this.get('elementId') + '-parent',
        inRoot      = this.get('_inRoot'),
        showModal   = this.get('showModal'),
        $this       = this.$();

    let listenForAuxHide = this._hidViaModal.bind(this);

    if ( showModal && !inRoot ) {
      $this.after('<div class="' + parentClass + '"></div>');
      $this.appendTo('body');
      this.set('_inRoot', true);
      Ember.Logger.log('showModal and not in root, now in root, binding listener');
      let $modal = this._bsFn(true);
      this.set('$modal', $modal);
      $modal.one('hidden.bs.modal', listenForAuxHide);
    } else if ( !showModal && inRoot ) {
      Ember.Logger.log('!showModal and in root');
      this.get('$modal').off('hidden.bs.modal', listenForAuxHide);
      if ( this.get('hiddenByModal') ) {
        Ember.Logger.log('hiddenByModal, unbinding prev listener');
        this._manipulateDOM();
        this.set('hiddenByModal', null);
      } else {
        Ember.Logger.log('hiding and binding listener');
        this._bsFn(false).one('hidden.bs.modal', this._manipulateDOM.bind(this));
      }
    }
  })),

  _hidViaModal () {
    this.setProperties({
      showModal: false,
      hiddenByModal: true
    });
  },

  _manipulateDOM () {
    Ember.Logger.log('Removing from DOM');
    $('.' + this.get('elementId') + '-parent').replaceWith( $('#' + this.get('elementId')) );
    this.setProperties({
      _inRoot: false,
      hiddenByModal: false
    });
  },

  _bsFn ( showModal ) {
    var $el = this.$();
    Ember.Logger.log('Show/hide modal?', showModal ? 'Showing' : 'Hiding');
    return showModal ? $el.modal(this.get('static') ? {
      keyboard: false,
      backdrop: 'static'
    } : 'show') : $el.modal('hide');
  },

  willDestroy () {
    if ( this.get('_inRoot') ) {
      var elId        = this.get('elementId'),
          parentClass = elId + '-parent';

      $('#' + elId).remove();
      $('.' + parentClass).remove();
    }
  }
});
