import titleCase from 'trust-enrollment/utils/title-case';

export default [
  {
    name:           'I got married',
    whenDid:        'you get married',
    code:           'marriage',
    timeAfterEvent: 30
  },
  {
    name:           'I now have a Domestic Partner',
    whenDid:        'you establish your domestic partnership',
    code:           'domesticPartnership',
    timeAfterEvent: 30
  },
  {
    name:           'I had or adopted a child',
    whenDid:        'you birth or adopt this child',
    code:           'birthAdoption',
    timeAfterEvent: 30
  },
  {
    name:           'I lost other coverage',
    whenDid:        'you lose coverage',
    code:           'lostCoverage',
    timeAfterEvent: 30
  },
  {
    name:           'I divorced or separated from my spouse',
    whenDid:        'you separate',
    code:           'divorce',
    timeAfterEvent: 30
  },
  {
    name:           'I have a Court Order',
    whenDid:        'you receive the court order',
    code:           'courtOrder',
    timeAfterEvent: 30
  },
  {
    name:           'I changed addresses or moved',
    whenDid:        'you change addresses',
    code:           'addressChange',
    timeAfterEvent: 30
  },
  {
    name:           'My Spouse is deceased',
    whenDid:        'your spouse die',
    code:           'spouseDeath',
    timeAfterEvent: 30
  },
  {
    name:           'My Dependent is deceased',
    whenDid:        'your dependent die',
    code:           'dependentDeath',
    timeAfterEvent: 30
  },
  {
    name:           'Dependent is over allowed age',
    whenDid:        'your dependent go over age',
    code:           'dependentOverAge',
    timeAfterEvent: 30
  }
].map(function ( ev ) {
  ev.name = titleCase( ev.name );
  return ev;
});
