import titleCase from 'trust-enrollment/utils/title-case';

export default [
  {
    name:            'I got married',
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
    whenDid:         'you birth or adopt this child',
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
    whenDid:         'you or your dependent lose coverage',
    code:            'lostCoverage',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'COBRA Documents',
      'Letter from Previous Carrier or Employer Showing Loss of Coverage',
      'Certificate of Creditable Coverage Documents will NOT be accepted on their own'
    ]
  },
  {
    name:            'I divorced or separated from my spouse',
    whenDid:         'you separate',
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
    whenDid:         'you receive the court order',
    code:            'courtOrder',
    timeAfterEvent:  30,
    requiresSupport: true,
    supportingDocuments: [
      'Legal Court Order'
    ]
  },
  {
    name:            'I changed addresses or moved',
    whenDid:         'you change addresses',
    code:            'addressChange',
    timeAfterEvent:  30,
    requiresSupport: false
  },
  {
    name:            'My Spouse is deceased',
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
    name:            'Dependent is over allowed age',
    whenDid:         'your dependent go over age',
    code:            'dependentOverAge',
    timeAfterEvent:  30,
    requiresSupport: false
  }
].map(function ( ev ) {
  ev.name = titleCase( ev.name );
  return ev;
});
