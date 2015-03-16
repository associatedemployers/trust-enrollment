export default function () {
  this.transition(
    this.fromRoute('index'),
    this.toRoute(['employee-login', 'employee-account']),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('transition-container'),
    this.fromRoute('employee-login'),
    this.toRoute(['employee-account']),
    this.use('fade'),
    this.reverse('fade')
  );

  this.transition(
    this.hasClass('employee-account--nested-transition-container'),
    this.fromRoute('employee-account.index'),
    this.toRoute(_regexMatch(/^employee-account./)),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.hasClass('employee-account--nested-transition-container'),
    this.withinRoute(_regexMatch(/^employee-account.(?!index)/)),
    this.use('toDown')
  );

  this.transition(
    this.hasClass('employee-account-edit--nested-transition-container'),
    this.withinRoute(_regexMatch(/^employee-account.edit./)),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}

function _regexMatch ( regex ) {
  return function ( routeName ) {
    return regex.test(routeName);
  };
}
