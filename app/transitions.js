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
    this.fromRoute('employee-account.liquid-outlet.index'),
    this.toRoute('employee-account.liquid-outlet.edit'),
    this.use('toLeft', { duration: 2000 })
  );

  this.transition(
    this.hasClass('test'),
    this.toModel(true),
    this.use('fade', { duration: 2000 })
  );
}

function _regexMatch ( regex ) {
  return function ( routeName ) {
    console.log(routeName);
    return regex.test(routeName);
  };
}
