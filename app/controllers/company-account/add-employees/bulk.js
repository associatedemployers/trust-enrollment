import Ember from 'ember';

export default Ember.Controller.extend({
  fileExtensions: [ 'csv' ],
  requiredFields: [ 'ssn', 'hiredate' ],
  uploadProgress:  0,
  invalidFile: Ember.computed.or('missingRequiredField', 'missingRequiredCol'),
  locationNotSelected: Ember.computed.not('location'),

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
  _asyncFileUpload: function ( file ) {
    var self     = this,
        formData = new FormData();

    formData.append('file', file);

    return new Ember.RSVP.Promise(function ( resolve, reject ) {
      Ember.$.ajax({
        type: 'POST',
        url: '/client-api/company-utilities/column-data',
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

  columnData: function () {
    var arr = this.get('parsedArray');

    return ( !arr || !arr.length ) ? arr : {
      headers: arr.slice(0, 1)[0],
      rows:    arr.slice(1, arr.get('length'))
    };
  }.property('parsedArray'),

  missingRequiredField: function () {
    var arr = this.get('parsedArray');

    if ( !arr || !arr.length ) {
      return;
    }

    return arr.get('firstObject').filter(function ( header ) {
      return !!header.missingFields;
    }).length > 0;
  }.property('parsedArray'),

  missingRequiredCol: function () {
    var arr = this.get('parsedArray'),
        required = this.get('requiredFields');

    if ( !arr || !arr.length ) {
      return;
    }

    var missing = required.filter(function ( requiredCol ) {
      return !arr.get('firstObject').findBy('matchedWith', requiredCol);
    });

    return ( missing.length > 0 ) ? missing : false;
  }.property('parsedArray'),

  shouldGetCompanyLocations: function () {
    var self = this;

    this.set('locationsError', null);

    return this.store.find('location').then(function ( locations ) {
      self.set('companyLocations', locations.get('content'));
    }).catch(function ( err ) {
      console.error(err);
      self.set('locationsError', ( err && err.responseText ) ? err.responseText : err);
    });
  }.observes('session.currentUser').on('init'),

  actions: {
    resetData: function () {
      this.set('parsedArray', null);
    },

    processFile: function () {
      this._startUpload();

      var self      = this,
          file      = this.get('file.firstObject'),
          endUpload = this._endUpload.bind( this );

      self._asyncFileUpload.call( self, file )
      .then(function ( response ) {
        if ( !response || response.length < 1 ) {
          return endUpload('Unexpected error. Missing data in response.');
        }

        endUpload();

        self.set('parsedArray', response);
      })
      .catch( endUpload );
    }
  }
});
