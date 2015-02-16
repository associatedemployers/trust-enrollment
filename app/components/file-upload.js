import Ember from 'ember';

var componentEventManager = Ember.Object.create({
  dragEnter: function ( e ) {
    e.stopPropagation();
    e.preventDefault();
  },

  dragOver: function ( e, component ) {
    e.stopPropagation();
    e.preventDefault();

    component.$().addClass('activated');
  },

  dragLeave: function ( e, component ) {
    e.stopPropagation();
    e.preventDefault();

    component.$().removeClass('activated');
  },

  drop: function ( e, component ) {
    e.stopPropagation();
    e.preventDefault();

    component.$().removeClass('activated');
    component._validateFiles( e.dataTransfer.files );
  }
});

export default Ember.Component.extend({
  classNames: [ 'file-upload' ],
  classNameBindings: [ 'dropzone' ],

  // Settings
  multi:    false,
  dropzone: true,
  maxFiles: 2,
  maxSize:  8, // in mb
  allowedExtensions: [ 'pdf', 'jpg', 'jpeg' ],

  files: [],
  doesNotHaveFiles: Ember.computed.not('hasFiles'),
  showDropzoneText: Ember.computed.and('dropzone', 'doesNotHaveFiles'),

  eventManager: componentEventManager,

  // Private
  _validateFiles: function ( files ) {
    this._clearError();
    this._clearFiles();

    var self   = this,
        multi  = this.get('multi'),
        max    = this.get('maxFiles'),
        _files = this.get('files');

    var extReg = new RegExp(this.get('allowedExtensions').map(function ( ext, index, exts ) {
      return ( ( exts.length - 1 ) === index ) ? ext : ext + '|';
    }).join(''), 'i');

    var handleError = function ( err ) {
      self.set('fileError', err);
    };

    for ( var i in files ) {
      if ( !files.hasOwnProperty( i ) || typeof files[ i ] !== 'object' ) {
        continue;
      }

      var file = files[ i ];

      if ( !extReg.test( file.name ) ) {
        handleError('One or more file types are not supported.');
      } else if ( ( !multi && _files.length > 0 ) || _files.length > max - 1 ) {
        handleError('File limit reached.');
      } else if ( Math.floor( file.size / 1000000 ) > this.get('maxSize') ) {
        handleError('Max file size exceeded.');
      } else {
        _files.pushObject( file );
      }
    }
  },

  _clearError: function () {
    this.set('fileError', null);
  },

  _clearFiles: function () {
    this.set('files', Ember.A());
  },

  // Computed
  inputId: function () {
    return this.get('elementId') + '-input';
  }.property('elementId'),

  dropzoneId: function () {
    return this.get('elementId') + '-dropzone';
  }.property('elementId'),

  hasFiles: function () {
    return this.get('files') && this.get('files.length') > 0;
  }.property('files.[]'),

  actions: {
    triggerFileInput: function () {
      this.$().find('#' + this.get('inputId')).click();
    },

    selectFile: function () {
      this._validateFiles( this.$().find('#' + this.get('inputId'))[0].files );
    },

    upload: function () {
      var dataUrl = this.get('dataUrl');

      Ember.assert('File upload component :: dataUrl must be specified', !!dataUrl);
    }
  }
});
