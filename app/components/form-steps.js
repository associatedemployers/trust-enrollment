import Ember from 'ember';
import layout from '../templates/components/form-steps';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'form',

  disableSubmit: Ember.computed.not('stepValid'),
  disableBack: Ember.computed.equal('step', 0),
  steps: Ember.computed.alias('childViews'),
  step: 0,
  _formBindings: Ember.A(),

  setStepsIndex: function () {
    console.debug('Form Component :: Setting step indexes');

    this.get('steps').forEach(function ( step, index ) {
      step.set('_formIndex', index);
    });
  }.observes('steps'),

  stepDidChange: function () {
    console.debug('Form Component :: Step index changed');

    var step = this.get('step'),
        formBindings = this.get('_formBindings'),
        validWith = this.get('validWith').objectAt(step);

    if ( formBindings.length > 0 ) {
      this._removeObservers(formBindings, this._setStepValid);
    }

    if ( validWith ) {
      console.debug('Form Component :: Setting up observers for', validWith.join(', '));
      this._addObservers(validWith, this._setStepValid);
    }

    this._setStepValid();
    Ember.run.scheduleOnce('afterRender', this, this._autofocus);
  }.observes('step').on('didInsertElement'),

  _addObservers: function ( keys, method ) {
    var self = this,
        added = [];

    keys.forEach(function ( key ) {
      added.push(key);
      self.get('_formBindings').pushObject(key);
      self.get('for').addObserver(key, self, method);
    });

    console.debug('Form Component :: Added observers for', added.join(', ') + '!');
  },

  _removeObservers: function ( keys, method ) {
    var self = this,
        removed = [];

    keys.forEach(function ( key ) {
      removed.push(key);
      self.get('for').removeObserver(key, self, method);
    });

    self.set('_formBindings', Ember.A());

    console.debug('Form Component :: Removed observers for', removed.join(', ') + '!');
  },

  _setStepValid: function () {
    Ember.run.debounce(this, function () {
      console.debug('Form Component :: Setting step validity');

      var self = this,
          formContext = this.get('for'),
          qual = this.get('qualification'),
          validWith = this.get('validWith').objectAt(this.get('step'));

      if ( !validWith ) {
        console.warn('Form Component :: No step validity definition, setting to true');
        return this.set('stepValid', true);
      }

      var invalid = validWith.filter(function ( key ) {
        var value = formContext.get(key),
            ret   = ( qual && qual[key] && typeof qual[key] === 'function' ) ? qual[key].call(formContext, value) : !!value;

        if ( typeof ret === 'string' && formContext.get(key) !== ret ) {
          self.get('for').set(key, ret);
        }

        return !ret;
      });

      this.set('stepValid', invalid.length < 1);
    }, 100);
  },

  _autofocus: function () {
    var step = this.get('steps').objectAt(this.get('step'));

    if ( !step ) {
      return;
    }

    step._focus.call(step);
  },

  onLast: function () {
    return this.get('steps').length === this.get('step') + 1;
  }.property('step', 'steps'),

  contextualButtonText: function () {
    if ( this.get('onLast') ) {
      return this.get('finishText') || 'Finish';
    }

    var showStepNames = this.get('includeStepNames'),
        step = this.get('step'),
        steps = this.get('steps'),
        stepName = steps.objectAt(step + 1).get('name'),
        stepSubmitText = steps.objectAt(step).get('submitText');

    var text = stepSubmitText || (this.get('submitText') || 'Next');

    return ( showStepNames && stepName ) ? text + ': ' + stepName : text;
  }.property('submitText', 'step'),

  currentTitle: function () {
    var step = this.get('steps').objectAt(this.get('step'));
    return ( step ) ? step.get('title') : false;
  }.property('step', 'steps.@each.title'),

  allowSkip: function () {
    var step = this.get('steps').objectAt(this.get('step'));
    return ( step ) ? step.get('allowSkip') : false;
  }.property('step', 'steps.@each.allowSkip'),

  submit: function ( e ) {
    e.preventDefault();
    this._next();
  },

  _next: function () {
    if ( this.get('onLast') ) {
      this.sendAction('finish');
    } else {
      this.incrementProperty('step');
    }
  },

  actions: {
    back: function () {
      this.decrementProperty('step');
    },

    skip: function () {
      this._next();
    }
  }
});
