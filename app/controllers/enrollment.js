import Ember from 'ember';
import { caseTitle } from '../utils/text-tools'; // jshint ignore:line

export default Ember.Controller.extend({
  queryParams: [ 'item' ],
  item: null,
  validity: Ember.Object.create(),
  _contentCache: Ember.Object.create(),

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
  sections: [
    {
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
        },
        {
          title: "enroll-personal-information",
          display: "Personal"
        }
      ],
      scrolledPast: function () {
        var enrollment = this.get('content');
        if(!enrollment.get('name_first')) {
          this.send('showModal', 'test-modal', false, 'body');
        }
        
      }
    },
    {
      title: "enroll-dependents",
      display: "Dependents"
    },
    {
      title: "enroll-test-section2",
      display: "Test Section #2"
    },
    {
      title: "enroll-test-section3",
      display: "Test Section #3"
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

    The updateProgress function also accesses this
    manifest to determine the progress of the form
    entry.
  */
  /* jshint ignore:start */
  entries: [
    {
      _valName: 'name_first',
      format: function (v) {
        return caseTitle(v);
      },
      validity: {
        _check: function (txt) {
          return (txt && txt.length > 0);
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
          return (txt && txt.length > 0);
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
          return (txt && txt.length > 0);
        },
        description: "Last Name"
      }
    },
    {
      _valName: 'address_line1',
      format: function (v) {
        return caseTitle(v);
      },
      validity: {
        _check: function (txt) {
          return (txt && txt.length > 4);
        },
        description: "Address Street"
      }
    },
    {
      _valName: 'address_city',
      format: function (v) {
        return caseTitle(v);
      },
      validity: {
        _check: function (txt) {
          return (txt && txt.length > 1);
        },
        description: "City"
      }
    },
    {
      _valName: 'address_state',
      validity: {
        _check: function (txt) {
          return (txt && txt.length === 2);
        },
        description: "State"
      }
    },
    {
      _valName: 'address_zipcode',
      format: function (v) {
        var minlen = v.length - 1;
        return (isNaN(v.charAt(minlen))) ? v.substring(0, minlen) : v.substring(0, 5);
      },
      validity: {
        _check: function (txt) {
          return (txt && txt.length === 5 && !isNaN(txt));
        },
        description: "State"
      }
    },
    {
      _valName: 'dob_year',
      validity: {
        _check: function (txt) {
          return (txt && !isNaN(txt));
        },
        description: "Year of Birth"
      }
    },
    {
      _valName: 'dob_month',
      validity: {
        _check: function (txt) {
          return (txt && !isNaN(txt));
        },
        description: "Month of Birth"
      }
    },
    {
      _valName: 'dob_day',
      validity: {
        _check: function (txt) {
          return (txt && !isNaN(txt));
        },
        description: "Day of Birth"
      }
    },
    {
      _valName: 'gender',
      validity: {
        _check: function (txt) {
          return (txt != undefined);
        },
        description: "Gender"
      }
    },
    {
      _valName: 'marital',
      validity: {
        _check: function (txt) {
          return (txt != undefined);
        },
        description: "Marital Status"
      }
    }
  ],
  /* jshint ignore:end */

  /* Bind all of these entries to the contentDidChange function */
  contentDidChange: function () {
    Ember.run.once(this, this.validityChecker);
  }.observes(
    'content.name_first', 
    'content.name_mi', 
    'content.name_last', 
    'content.address_line1', 
    'content.address_line2', 
    'content.address_city', 
    'content.address_state', 
    'content.address_zipcode', 
    'content.dob_day', 
    'content.dob_month', 
    'content.dob_year',
    'content.gender',
    'content.marital'
  ),

  /* Check validity amung other things */
  validityChecker: function () {
    var v = this.get('entries'),
        self = this;
    
    var verifyValidity = function (validityObject, val) {
      // Do the validity check
      validityObject.valid = validityObject.validity._check(val);

      console.debug(validityObject._valName, 'is', validityObject.valid, 'with property', val);

      // Set it for template access
      self.get('validity').set(validityObject._valName, validityObject.valid);

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
    };
    
    this.set('entries', v.map(function (obj) {
      // Set current and cache for comparison
      var current   = self.get('content').get(obj._valName),
          cache     = self.get('_contentCache') || null,
          cached    = ( cache ) ? cache.get(obj._valName) : null,
          formatted = ( current ) ? runFormat(current, obj.format, obj._valName) : null,
          // Return the object to the mapper only if the value hasn't changed. If it has, pass it to the verifyValidity function
          returnObj = ( cached !== formatted ) ? verifyValidity(obj, formatted) : obj;
      if(cache) {
        cache.set(obj._valName, formatted);
      }
      return returnObj;
    }));

    return Ember.run.once(this, this._updateProgress);
  }.observes('content.name_first'),

  _updateProgress: function () {
    var prog = 0,
        entries = this.get('entries'),
        entriesLen = entries.length;
    // Loop through entries
    for (var k in entries) {
      if(entries[k] && entries[k].valid) {
        prog++;
      }
    }
    // Return progress
    return this.set('progress', Math.round( ( prog / entriesLen ) * 100));
  },

  actions: {
    changeActive: function (id) {
      Ember.run.scheduleOnce('afterRender', this, function () {
        $('html, body').animate({
          scrollTop: $("#" + id).offset().top - ( $('.app-header').height() + 20 )
        }, 1000);
      });
    },
    jumpToNext: function () {
      var sections = this.get('sections'),
          sectionIndex;
      // Find index of current active
      sections.find(function (section, index) {
        if(section.active === true) {
          return sectionIndex = index;
        }
      });
      // Increment to next section
      sectionIndex++;
      // Set toShow for easy access on the return statement
      var toShow = sections.objectAt(sectionIndex);
      // Only fire changeActive action if we have a "next" section
      return (toShow) ? this.send('changeActive', toShow.title) : null;
    }
  }
});