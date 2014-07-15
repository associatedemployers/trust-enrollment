import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [ 'item' ],
  item: null,

  // Manifest the sections that will be in the form
  // !!! Default layout is: !!!
  // {
  //   title: "my-title" //DASHERIZED!
  //   display: "My Title",
  //   subtitles: [ ] //Array of subtitles, one layer, discard from object if not present
  // }
  sections: [ {
      title: "enroll-basic-information",
      display: "Basic Information",
      subtitles: [
        {
          title: "enroll-basic-information-name",
          display: "Name"
        },
        {
          title: "enroll-basic-information-address",
          display: "Address"
        }
      ],
    },
    {
      title: "enroll-personal-information",
      display: "Personal Information"
    }
  ],

  input_manifest: [
    {
      input_id: '',
      validity: {
        check: function (txt) {
          return text !== null;
        },
        description: "First Name"
      }
    }
  ]
});