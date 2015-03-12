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
    this.debug(),
    this.withinRoute('employee-account'),
    this.use('toLeft')
  );
}
/*
function _regexMatch ( regex ) {
  return function ( routeName ) {
    console.log(routeName);
    return regex.test(routeName);
  };
}
*/
