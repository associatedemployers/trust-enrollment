import Ember from 'ember';
import titleCase from 'trust-enrollment/utils/title-case';

export {
  titleCase
};

export default Ember.Handlebars.makeBoundHelper(titleCase);
