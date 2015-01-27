import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  faqId: attribute('number'),
  question: attribute('string'),
  answer: attribute('string'),

  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
