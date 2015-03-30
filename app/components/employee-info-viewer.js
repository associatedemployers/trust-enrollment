import Ember from 'ember';
import TooltipsMixin from 'trust-enrollment/mixins/render-tooltips';

export default Ember.Component.extend(TooltipsMixin, {
  classNames: [ 'employee-info-viewer', 'clearfix' ],

  init: function () {
    this._super.apply(this, arguments);

    this.get('employee').set('selected', true);
    this.set('selectedInfo', this.get('employee'));
  },

  coverage: function () {
    var person = this.get('selectedInfo'),
        types  = [ 'medical', 'dental', 'vision', 'life' ];

    return types.map(function ( type ) {
      return {
        type: type,
        covered: !!person.get(type + 'Rates.firstObject')
      };
    });
  }.property('selectedInfo', 'selectedInfo.medicalRates', 'selectedInfo.dentalRates', 'selectedInfo.visionRates', 'selectedInfo.lifeRates'),

  employeeDidChange: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this._renderTooltips();
    });
  }.observes('employee.dependents.@each.firstName'),

  selectedIsMale: function () {
    return this.get('selectedInfo.gender') === 'male';
  }.property('selectedInfo.gender'),

  actions: {
    selectObject: function ( object ) {
      object.set('selected', true);
      this.get('selectedInfo').set('selected', false);
      this.set('selectedInfo', object);
    }
  }
});
