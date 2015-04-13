import Ember from 'ember';

export default Ember.Controller.extend({
  enrollmentPeriodValid: Ember.computed.and('pendingEnrollmentPeriod.start', 'pendingEnrollmentPeriod.end'),
  enrollmentPeriodNotValid: Ember.computed.not('enrollmentPeriodValid'),
  disableForm: Ember.computed.or('enrollmentPeriodNotValid', 'savingEnrollmentPeriod'),

  year: moment().year(),

  years: function () {
    var currentYear = moment().year(),
        years       = [];

    for ( var i = 0; i < 3; i++ ) {
      years.push(currentYear + i);
    }

    return years;    
  }.property(),

  calendarBlocks: function () {
    var enrollmentPeriods = this.get('model'),
        months            = Ember.A(),
        year              = this.get('year');

    var byMatchingPeriod = function ( period ) {
      return monthMoment.isAfter(moment(period.get('start'))) && monthMoment.isBefore(moment(period.get('end')));
    };

    var toTooltip = function ( ret, period ) {
      ret += ( period.get('super') ) ? 'Plan Set Period' : 'Company Set Period';
      ret += ': ' + moment(period.get('start')).format('MM/DD/YYYY') + '-' + moment(period.get('end')).format('MM/DD/YYYY') + '<br />';
      return ret;
    };

    for ( var i = 0; i < 12; i++ ) {
      var monthMoment = moment().year(year).month(i);
      var matchingEnrollmentPeriods = enrollmentPeriods.filter(byMatchingPeriod);

      months.addObject({
        name:    monthMoment.format('MMM \'YY'),
        tooltip: matchingEnrollmentPeriods.reduce(toTooltip, ''),
        periods: matchingEnrollmentPeriods
      });
    }

    return months;
  }.property('year', 'model.@each.start', 'model.@each.end'),

  startDateDisable: function () {
    var currentDate = moment();

    return [ true ].concat(this.get('model').filterBy('super', true).filter(function ( period ) {
      return moment(period.get('end')).isAfter(currentDate);
    }).map(function ( period ) {
      return { from: period.get('start'), to: moment(period.get('end')).subtract(1, 'day').toDate() };
    }));
  }.property('model.[]'),

  endDateDisable: function () {
    var startSelection = moment(this.get('pendingEnrollmentPeriod.start'));

    if ( !startSelection ) {
      return this.get('startDateDisable');
    }

    var matched = this.get('model').find(function ( period ) {
      return period.get('start') && period.get('end') && moment(period.get('start')).subtract(1, 'day').isBefore(startSelection) && moment(period.get('end')).isAfter(startSelection);
    });

    if ( !matched ) {
      return this.get('startDateDisable');
    }
    return [ true, {
      from: startSelection.add(1, 'day').toDate(),
      to:   matched.get('end')
    }];
  }.property('startDateDisable', 'pendingEnrollmentPeriod.start'),

  startSelectionDidChange: function () {
    this.set('endDateTextValue', null);
  }.observes('pendingEnrollmentPeriod.start'),

  actions: {
    toggleAddingPeriod: function () {
      if ( !this.get('addingPeriod') ) {
        this.set('pendingEnrollmentPeriod', this.store.createRecord('enrollment-period'));
      }

      this.toggleProperty('addingPeriod');
    },

    addPeriod: function () {
      if ( this.get('disableForm') ) {
        return;
      }

      var self = this;

      var _end = function ( err, successMessage ) {
        var errMsg = ( err && err.responseText ) ? err.responseText : err;

        self.setProperties({
          saveError:              errMsg,
          successMessage:         successMessage,
          savingEnrollmentPeriod: false
        });
      };

      _end();

      this.set('savingEnrollmentPeriod', true);

      this.get('pendingEnrollmentPeriod').save().then(function ( /* period */ ) {
        _end(null, 'Successfully saved enrollment period.');
        self.send('toggleAddingPeriod');
        self.get('target').send('refresh');
      }).catch(_end);
    },

    deletePeriod: function ( period ) {
      period.destroyRecord();
    }
  }
});
