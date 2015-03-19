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

    var step      = this.get('step'),
        formBindings = this.get('_formBindings'),
        validWith = this.get('validWith').objectAt(step);

    if ( validWith ) {
      console.debug('Form Component :: Setting up observers for', validWith.join(', '));
      this._addObservers(validWith, this._setStepValid);
    }

    if ( formBindings.length > 0 ) {
      this._removeObservers(formBindings, this._setStepValid);
    }

    this._setStepValid();
  }.observes('step').on('didInsertElement'),

  _addObservers: function ( keys, method ) {
    var self = this;

    keys.forEach(function ( key ) {
      self.get('_formBindings').pushObject(key);
      self.get('for').addObserver(key, method.bind(self));
    });

    console.debug('Form Component :: Added observers!');
  },

  _removeObservers: function ( keys, method ) {
    var self = this;

    keys.forEach(function ( key ) {
      self.get('_formBindings').removeObject(key);
      self.get('for').removeObserver(key, method.bind(self));
    });

    console.debug('Form Component :: Removed observers!');
  },

  _setStepValid: function () {
    console.debug('Form Component :: Setting step validity');
    var formContext = this.get('for'),
        qual = this.get('qualification'),
        validWith = this.get('validWith').objectAt(this.get('step'));

    if ( !validWith ) {
      console.debug('Form Component :: No step validity definition, setting to true');
      return this.set('stepValid', true);
    }

    var invalid = validWith.filter(function ( key ) {
      var value = formContext.get(key);
      return ( qual && qual[key] && typeof qual[key] === 'function' ) ? !qual[key].call(formContext, value) : !value;
    });

    console.debug('Form Component :: Any invalid?', invalid.join(', '));

    this.set('stepValid', invalid.length < 1);
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

  submit: function ( e ) {
    e.preventDefault();

    this.incrementProperty('step');
  }
});
