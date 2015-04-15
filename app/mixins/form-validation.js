import Ember from 'ember';

/*
  Form Validation Mixin
  Observes and fires validation and formatting hooks for form fields
  Adds helpful form tools
*/

export default Ember.Mixin.create({
  validity: Ember.Object.create(),
  __registeredObservers: Ember.A(),

  genericFieldValidator: function ( val ) {
    return val && val.length > 0;
  },

  invalid: Ember.A(),

  // Private Methods
  __registerValidationObservers: function () {
    console.debug('FV Mixin :: Registering validation observers...');

    var fields = this.get('fields'),
        self   = this;

    if ( !fields || fields.length < 1 ) {
      return console.debug('FV Mixin :: No validation fields found.');
    }

    if ( this.get('__registeredObservers.length') > 0 ) {
      this.__removeObservers();
    }

    fields.forEach(function ( field ) {
      self.addObserver(field.key, self, self.__validateValue);
      self.get('__registeredObservers').addObject(field.key);
      console.debug('FV Mixin :: Added observer for field: ', field.key);
    });
  }.observes('fields').on('init'),

  __removeObservers: function () {
    var self = this;

    this.get('__registeredObservers').forEach(function ( key, index, array ) {
      self.removeObserver(key, self, self.__validateValue);
      array.removeObject(key);
    });
  }.on('willDestroy'),

  __setInvalid: function () {
    var validity = this.get('validity'),
        fields = this.get('fields'),
        invalid = this.get('invalid');

    var fieldMatchingKey = function ( key ) {
      return function ( field ) {
        return field.key === key || field.key.indexOf(key) > -1;        
      };
    };

    for ( var key in validity ) {
      if ( !validity.hasOwnProperty(key) ) {
        continue;
      }

      var found  = fields.find(fieldMatchingKey(key)),
          exists = invalid.findBy('id', found.id);

      if ( validity[key] === true && exists ) {
        invalid.removeObject(exists);
      } else if ( !validity[key] && !exists ) {
        invalid.pushObject($.extend({ name: this.__decamelize(key) }, found));
      }
    }
  },

  // Validate/format Value
  __validateValue: function ( sender, key ) {
    Ember.run.once(this, function () {
      var field = this.get('fields').findBy('key', key);

      if ( !field ) {
        return;
      }

      console.debug('FV Mixin :: Setting validity for key:', key);

      var value = this.get(key),
          validator = ( this.__isFn(field.validate) ) ? field.validate : this.get('genericFieldValidator');

      this.get('validity').set(key.split('.').pop(), validator.call(this, value));

      var genericFormatter = this.get('genericFieldFormatter'),
          hasGeneric = this.__isFn(genericFormatter),
          hasPrivate = this.__isFn(field.format);


      if ( hasGeneric || hasPrivate ) {
        console.debug('FV Mixin :: Formatting value for key:', key);
        var newVal = value;

        if ( hasGeneric ) {
          newVal = genericFormatter(newVal);
        }

        if ( hasPrivate ) {
          newVal = field.format(newVal);
        }

        this.set(key, newVal);
      }

      Ember.run.once(this, this.__setInvalid);
    });
  },

  __isFn: function ( fn ) {
    return fn && typeof fn === 'function';
  },

  __decamelize: function ( str ) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function ( s ) {
      return s.toUpperCase();
    });
  },

  actions: {
    focusInput: function ( id ) {
      $('input#' + id).focus();
    }
  }
});
