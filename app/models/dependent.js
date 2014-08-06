import DS from 'ember-data';
import { dependent_relationships_context as depContexts } from '../utils/defined-data';

var attribute = DS.attr;

export default DS.Model.extend({
  // Name
  firstName:     attribute('string'),
  middleInitial: attribute('string'),
  lastName:      attribute('string'),

  // Personal Info
  dobDay:        attribute('number'),
  dobMonth:      attribute('number'),
  dobYear:       attribute('number'),

  ssn:           attribute('string'),
  relationship:  attribute('string'),
  gender:        attribute('string'),

  additionalProvider: attribute('string'),

  // Relational
  enrollment:    DS.belongsTo('enrollment'),

  // Computed
  dob: function () {
    var m = this;

    return m.get('dobMonth') + '/' + m.get('dobDay') + '/' + m.get('dobYear');
  }.property('dobDay', 'dobMonth', 'dobYear'),

  fullName: function () {
    return this.get('firstName') + ' ' + this.get('middleInitial') + ' ' + this.get('lastName');
  }.property('firstName', 'middleInitial', 'lastName'),

  contextualRelationship: function () {
    var m = this.getProperties('relationship', 'gender');

    var contextual = depContexts[ m.relationship ];

    return ( m.gender && contextual && contextual[ m.gender ] ) ? contextual[ m.gender ] : m.relationship;
  }.property('relationship', 'gender'),

  maskedSSN: function () {
    var ssn = this.get('ssn');

    return ( ssn ) ? this.get('ssn').replace(/(\d{3})(\d{2})(\d{4})/, '***-**-$3') : ssn; 
  }.property('ssn')
});