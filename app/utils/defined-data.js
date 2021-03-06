var states = [
  { v: 'AL', l: 'Alabama' },
  { v: 'AK', l: 'Alaska' },
  { v: 'AZ', l: 'Arizona' },
  { v: 'AR', l: 'Arkansas' },
  { v: 'CA', l: 'California' },
  { v: 'CO', l: 'Colorado' },
  { v: 'CT', l: 'Connecticut' },
  { v: 'DE', l: 'Delaware' },
  { v: 'DC', l: 'District of Columbia' },
  { v: 'FL', l: 'Florida' },
  { v: 'GA', l: 'Georgia' },
  { v: 'HI', l: 'Hawaii' },
  { v: 'ID', l: 'Idaho' },
  { v: 'IL', l: 'Illinois' },
  { v: 'IN', l: 'Indiana' },
  { v: 'IA', l: 'Iowa' },
  { v: 'KS', l: 'Kansas' },
  { v: 'KY', l: 'Kentucky' },
  { v: 'LA', l: 'Louisiana' },
  { v: 'ME', l: 'Maine' },
  { v: 'MD', l: 'Maryland' },
  { v: 'MA', l: 'Massachusetts' },
  { v: 'MI', l: 'Michigan' },
  { v: 'MN', l: 'Minnesota' },
  { v: 'MS', l: 'Mississippi' },
  { v: 'MO', l: 'Missouri' },
  { v: 'MT', l: 'Montana' },
  { v: 'NE', l: 'Nebraska' },
  { v: 'NV', l: 'Nevada' },
  { v: 'NH', l: 'New Hampshire' },
  { v: 'NJ', l: 'New Jersey' },
  { v: 'NM', l: 'New Mexico' },
  { v: 'NY', l: 'New York' },
  { v: 'NC', l: 'North Carolina' },
  { v: 'ND', l: 'North Dakota' },
  { v: 'OH', l: 'Ohio' },
  { v: 'OK', l: 'Oklahoma' },
  { v: 'OR', l: 'Oregon' },
  { v: 'PA', l: 'Pennsylvania' },
  { v: 'RI', l: 'Rhode Island' },
  { v: 'SC', l: 'South Carolina' },
  { v: 'SD', l: 'South Dakota' },
  { v: 'TN', l: 'Tennessee' },
  { v: 'TX', l: 'Texas' },
  { v: 'UT', l: 'Utah' },
  { v: 'VT', l: 'Vermont' },
  { v: 'VA', l: 'Virginia' },
  { v: 'WA', l: 'Washington' },
  { v: 'WV', l: 'West Virginia' },
  { v: 'WI', l: 'Wisconsin' },
  { v: 'WY', l: 'Wyoming' }
];

// Not sure we will be using this.
var suffixes = [
  'test'
];

var genders = [
  'Male',
  'Female'
];

var marital_statuses = [
  'Single',
  'Married'
];

var dependent_relationships = [
  'Spouse',
  'Child',
  'Domestic Partner',
  'Legal Dependent'
];

var dependent_relationships_context = {
  Spouse: {
    Male:   'Husband',
    Female: 'Wife'
  },
  Child: {
    Male:   'Son',
    Female: 'Daughter'
  }
};

export { states, suffixes, genders, marital_statuses, dependent_relationships, dependent_relationships_context };
