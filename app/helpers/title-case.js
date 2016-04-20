import Ember from 'ember';
import titleCaseUtil from 'trust-enrollment/utils/title-case';

function titleCase ([value]) {
  return titleCaseUtil(value);
}

export {
  titleCase
};

export default Ember.Helper.helper(titleCase);
