import titleCase from 'trust-enrollment/utils/title-case';

export default [
  {
    name:            'I got married',
    title:           'Marriage',
    whenDid:         'you get married',
    code:            'marriage',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Marriage License',
      'Declaration of Marriage'
    ]
  },
  {
    name:            'I now have a Domestic Partner',
    title:           'Domestic Partnership',
    whenDid:         'you establish your domestic partnership',
    code:            'domesticPartnership',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Declaration of Domestic Partnership with Special Evidentiary Documentation'
    ]
  },
  {
    name:            'I had or adopted a child',
    title:           'Birth/Adoption',
    whenDid:         'you add this dependent (birth/adoption date)',
    code:            'birthAdoption',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Birth Certificate',
      'Court-granted Adoption Document',
      'Orders for the Placement for Adoption'
    ]
  },
  {
    name:            'I or my dependent lost other coverage',
    title:           'Loss of Coverage',
    whenDid:         'you or your dependent lose coverage',
    code:            'lostCoverage',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'COBRA Documents',
      'Letter from Previous Carrier or Employer Showing Loss of Coverage'
    ]
  },
  {
    name:            'I divorced or separated from my spouse',
    title:           'Divorce/Separation',
    whenDid:         'you divorce or separate',
    code:            'divorce',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Decree of Divorce',
      'Court-granted Annulment Document',
      'Court-granted Legal Separation Document'
    ]
  },
  {
    name:            'I have a Court Order',
    title:           'Court Order',
    whenDid:         'the court issue the order',
    code:            'courtOrder',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Legal Court Order'
    ]
  },
  {
    name:            'I changed addresses or moved',
    title:           'Changed Address',
    whenDid:         'you change addresses',
    code:            'addressChange',
    timeAfterEvent:  30,
    requiresSupport: false
  },
  {
    name:            'My Spouse is deceased',
    title:           'Spouse Deceased',
    whenDid:         'your spouse die',
    code:            'spouseDeath',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Death Certificate',
      'Obituary'
    ]
  },
  {
    name:            'My Dependent is deceased',
    title:           'Dependent deceased',
    whenDid:         'your dependent die',
    code:            'dependentDeath',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Death Certificate',
      'Obituary'
    ]
  },
  {
    name:            'Dependent is over age 26',
    title:           'Dependent over age',
    whenDid:         'your dependent reach age 26',
    code:            'dependentOverAge',
    timeAfterEvent:  30,
    requiresSupport: false
  }
].map(function ( ev ) {
  ev.name  = titleCase( ev.name );
  ev.title = titleCase( ev.title );
  return ev;
});
