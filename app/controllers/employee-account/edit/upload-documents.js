import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'employee-account/edit' ],

  eventSelection:  Ember.computed.alias('controllers.employee-account/edit.eventSelection'),
  supportingFiles: Ember.A(),
  uploadProgress:  0,

  _startUpload: function () {
    this.setProperties({
      uploadError:    null,
      uploadingFiles: true
    });
  },

  _endUpload: function ( err ) {
    err = ( err && err.responseText ) ? err.responseText : err;

    this.setProperties({
      uploadError:    err,
      uploadingFiles: false
    });
  },

  // BROWSER POLYFILL WARNING:
  // The FormData Object is only available to following browsers:
  // IE 10+, Firefox 4.0+, Chrome 7+, Safari 5+, Opera 12+
  // Will need a polyfill to support less than versions
  _asyncFileUpload: function ( files ) {
    var self = this;

    return new Ember.RSVP.Promise(function ( resolve, reject ) {
      Ember.$.ajax({
        type: 'POST',
        url: '/client-api/file',
        data: new FormData( files ),
        xhr: function () {
          var xhr = new window.XMLHttpRequest();

          xhr.upload.addEventListener('progress', function ( evt ) {
            if ( evt && evt.lengthComputable ) {
              self.set('uploadProgress', evt.loaded / evt.total);
            }
          }, false);

          return xhr;
        },
        success: resolve,
        error:   reject
      });
    });
  },

  // uploadProgress: function () {
  //   if ( !this.get('uploadingFiles') ) {
  //     return 0;
  //   }

  //   var sum = this.get('fileProgress').reduce(function ( s, p ) {
  //     return s + p.computed;
  //   }, 0);

  //   return Math.round( sum );
  // }.property('fileProgress', 'supportingFiles.[]', 'uploadingFiles'),

  actions: {
    upload: function () {
      this._startUpload();

      var self  = this,
          files = this.get('supportingFiles');

      self._asyncFileUpload( files )
      .then(function ( response ) {
        console.log(response);
      })
      .catch( self._endUpload );
    }
  }
});
