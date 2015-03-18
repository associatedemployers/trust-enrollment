import Ember from 'ember';

export default Ember.Controller.extend({
  employeesOverTimeChart: {
    dataOptions: {
      x: 'x',
      labels: false,
    },
    chartOptions: {
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      },
      zoom: {
        enabled: true
      }
    }
  },

  getEmployeesOverTimeDataset: function () {
    var company = this.get('content'),
        self    = this;

    this.store.find('employee', { select: 'legacyClientEmploymentDate legacyClientTerminationDate waived' }).then(function ( employees ) {
      if ( !company || !employees ) {
        return Ember.A();
      }

      var currentDate   = moment(),
          startDate     = moment( company.get('legacyCompEffectDate') ),
          monthsBetween = Math.abs( startDate.diff( currentDate, 'months' ) ),
          timePad       = ( monthsBetween > 100 ) ? 100 : monthsBetween,
          dataSet       = Ember.A([
            [ 'x' ],
            [ 'Participating Employees' ],
            [ 'Terminated Employees' ]
          ]);

      var loopDate = moment( startDate ).date( 1 );

      var checkEmployee = function ( employee ) {
        var emp  = ( employee.get('legacyClientEmploymentDate') )  ? moment( employee.get('legacyClientEmploymentDate') )  : null,
            term = ( employee.get('legacyClientTerminationDate') ) ? moment( employee.get('legacyClientTerminationDate') ) : null;

        if( term && term.isBefore( loopDate ) ) {
          return terminatedCount++;
        }

        if( !employee || employee.get('waived') === true ) {
          return;
        }

        if( emp && emp.isBefore( loopDate ) ) {
          if( !term || term.isAfter( loopDate ) ) {
            activeCount++;
          }
        } else if ( !emp && term && term.isAfter( loopDate ) ) {
          activeCount++;
        }
      };

      for ( var i = 0; i < timePad; i++ ) {
        var activeCount     = 0,
            terminatedCount = 0;

        if( loopDate.isAfter(currentDate) ) {
          break;
        }

        employees.forEach( checkEmployee );

        dataSet[ 0 ].pushObject( loopDate.format('YYYY-MM-DD') );
        dataSet[ 1 ].pushObject( activeCount );
        dataSet[ 2 ].pushObject( terminatedCount );

        loopDate.add(Math.ceil( monthsBetween / timePad ), 'months');
      }

      self.set('employeesOverTimeDataset', dataSet);
    });
  }.observes('content.employees.[]'),
});
