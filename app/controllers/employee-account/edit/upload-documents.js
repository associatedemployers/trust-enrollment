import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'employee-account/edit', 'employee-account/edit/qualify-event' ],

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
    var errMsg = ( err && err.responseText ) ? err.responseText : err;

    if ( err ) {
      console.error(err);
    }

    this.setProperties({
      uploadError:    errMsg,
      uploadingFiles: false
    });
  },

  // BROWSER POLYFILL WARNING:
  // The FormData Object is only available to following browsers:
  // IE 10+, Firefox 4.0+, Chrome 7+, Safari 5+, Opera 12+
  // Will need a polyfill to support less than versions
  _asyncFileUpload: function ( files ) {
    var self     = this,
        formData = new FormData(),
        tag      = this.get('selfTag');

    files.toArray().forEach(function ( file, index ) {
      formData.append('file' + index, file);
      formData.append(file.name + '-label', tag);
    });

    return new Ember.RSVP.Promise(function ( resolve, reject ) {
      Ember.$.ajax({
        type: 'POST',
        url: '/client-api/files/',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        xhr: function () {
          var xhr = new window.XMLHttpRequest();

          xhr.upload.addEventListener('progress', function ( evt ) {
            if ( evt && evt.lengthComputable ) {
              self.set('uploadProgress', Math.round((evt.loaded / evt.total) * 100));
            }
          }, false);

          return xhr;
        },
        success: resolve,
        error:   reject
      });
    });
  },

  _createReview: function ( attachments ) {
    var enrollmentReview = this.store.createRecord('enrollment-review', {
      employee:   this.session.get('currentUser'),
      eventType:  this.get('eventSelection.code'),
      eventTitle: this.get('eventSelection.title'),
      eventDate:  this.get('controllers.employee-account/edit/qualify-event.dateSelection')
    });

    if ( attachments ) {
      enrollmentReview.get('attachments').addObjects(attachments);
    }

    return enrollmentReview;
  },

  actions: {
    upload: function () {
      this._startUpload();

      var self      = this,
          files     = this.get('supportingFiles').toArray(),
          endUpload = this._endUpload.bind( this );

      self._asyncFileUpload.call( self, files )
      .then(function ( response ) {
        if ( !response.file || response.file.length < 1 ) {
          return endUpload('Unexpected error. Missing files in response.');
        }

        self.store.pushPayload('file', response);
        endUpload();

        Ember.run.next(self, function () {
          var promises = response.file.map(function ( file ) {
            return self.store.find('file', file.id);
          });

          Ember.RSVP.all(promises).then(function ( fileModels ) {
            self.transitionToRoute('employee-account.edit.review', self._createReview.call(self, fileModels));
          });
        });
      })
      .catch( endUpload );
    },

    skipUpload: function () {
      this.transitionToRoute('employee-account.edit.review', this._createReview.call(this));
    }
  }
});
