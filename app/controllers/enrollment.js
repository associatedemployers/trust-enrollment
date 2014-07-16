import Ember from 'ember';
import { caseTitle } from '../utils/text-tools';

export default Ember.Controller.extend({
  queryParams: [ 'item' ],
  item: null,

  /*
    Here we manifest the enrollment sections we want rendered into
    the scrollspy.
    --------
    The helpers assume the following:
     -> There is either:
       A) A partial for the main title
       B) A partial for each subtitle if no main
          title is specified.
     -> Title value is set to the NAME of the 
        partial template you want rendered
     -> Display value is obviously the text you
        want displayed for each section

    This partial rendering system makes it easier
    to plan/implement form elements. Make sure
    to manifest your inputs into entries for
    validation and formatting.
  */
  sections: [ {
      title: "enroll-basic-information",
      display: "Basic Information",
      subtitles: [
        {
          title: "enroll-basic-information-name",
          display: "Name"
        },
        {
          title: "enroll-basic-information-address",
          display: "Address"
        }
      ],
    },
    {
      title: "enroll-personal-information",
      display: "Personal Information"
    }
  ],

  /*
    Here we manifest the entries we want validated and/or formatted
    --------
    The content listener will run "validityChecker" 
    with the object.validity._check function to 
    determine the value of object.valid

    The "validityChecker" also updates the content
    with the return value located in object.format.
    Format is optional when using validity._check
  */
  entries: [
    {
      _valName: 'name_first',
      format: function (v) {
        return caseTitle(v);
      },
      validity: {
        _check: function (txt) {
          return txt !== null;
        },  
        description: "First Name"
      }
    },
    {
      _valName: 'name_mi',
      format: function (v) {
        return v.charAt(0).toUpperCase();
      },
      validity: {
        _check: function (txt) {
          return (txt !== null && txt.length === 1);
        },  
        description: "Middle Initial"
      }
    },
    {
      _valName: 'name_last',
      format: function (v) {
        return caseTitle(v);
      },
      validity: {
        _check: function (txt) {
          return txt !== null;
        },
        description: "Last Name"
      }
    }
  ],

  contentDidChange: function () {
    Ember.run.once(this, this.validityChecker);
  }.observes('content.name_first', 'content.name_mi', 'content.name_last', 'content.address_line1', 'content.address_line2', 'content.address_city', 'content.address_state', 'content.address_zipcode'),

  validityChecker: function () {
    var v = this.get('entries'),
        self = this;
    
    var verifyValidity = function (validityObject, val) {
      // Do the validity check
      validityObject.valid = validityObject.validity._check(val);
      // Return the validityObject to the mapper
      return validityObject;
    };

    var runFormat = function (val, format, update) {
      // Don't run this if we don't have an format function
      if(!format) {
        return val;
      }
      // Run the format function
      val = format(val);
      // Update the content with the new value
      self.get('content').set(update, val);
      // Return for validity parsing
      return val;
    }
    
    this.set('validity', v.map(function (obj) {
      // Set current and cache for comparison
      var current = self.get('content').get(obj._valName),
          cache   = self.get('_contentCache') || null;
      // Return the object to the mapper only if the value hasn't changed. If it has, pass it to the verifyValidity function
      return ( (cache) ? self.get('_contentCache').get(obj._valName) : undefined !== current) ? verifyValidity(obj, runFormat(current, obj.format, obj._valName)) : obj;
    }));

    return Ember.run.once(this, this._setCache);
  }.observes('content.name_first'),

  _setCache: function () {
    // This function is used by validityChecker to ensure no redundant action is made,
    // keeping the app from slowing down.
    this.set('_contentCache', this.get('content'));
  }
});