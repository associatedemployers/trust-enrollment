import titleCase from 'trust-enrollment/utils/title-case';

export default function addressFormatter () {
  var data = this.getProperties('addressLine1', 'addressLine2', 'addressCity', 'addressState', 'addressZipcode', 'hasAddress');

  if ( data.hasAddress === false ) {
    return '';
  }

  data.addressLine2   = ( data.addressLine2 ) ? data.addressLine2 + ' ' : '';
  data.addressZipcode = ( data.addressZipcode ) ? data.addressZipcode : '';

  return titleCase( data.addressLine1 + ' ' + data.addressLine2 + data.addressCity + ', ' + data.addressState + ' ' + data.addressZipcode );
}
