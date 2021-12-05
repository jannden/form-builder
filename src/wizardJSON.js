const wizardJSON = [
  {
    pages: [
      {
        title: "Basic Information",
        fields: [
          {
            id: "firstname",
            label: "First Name",
            required: true,
            placeholder: "Enter your first name ...",
            type: "text",
            value: "",
          },
          {
            id: "lastname",
            label: "Last Name",
            required: true,
            placeholder: "Enter your last name ...",
            type: "text",
            value: "",
          },
          {
            id: "bday",
            label: "Birth Date",
            placeholder: "DD/MM/YYY",
            type: "text",
            value: "",
          },
        ],
      },
      {
        title: "Contact Details",
        fields: [
          {
            id: "email",
            label: "Email",
            required: true,
            placeholder: "Enter your email ...",
            type: "text",
            value: "",
          },
          {
            id: "phone",
            label: "Phone",
            required: true,
            placeholder: "Enter your phone ...",
            type: "text",
            value: "",
          },
          {
            id: "country",
            label: "County",
            required: true,
            type: "select",
            options: [
              {
                label: "Bulgaria",
              },
              {
                label: "Greece",
              },
              {
                label: "Romania",
              },
              {
                label: "Serbia",
              },
            ],
            value: "",
          },
        ],
      },
      {
        title: "Terms and Conditions Agreement",
        fields: [
          {
            id: "terms-conditions-agreement",
            label: "Accept Terms and Conditions Agreement",
            type: "checkbox",
            required: true,
            value: "",
          },
          {
            id: "subscribe",
            label: "Subscribe to newsletter",
            type: "checkbox",
            value: "",
          },
          {
            id: "newsletter-category",
            label: "Newsletter Categories",
            required: true,
            type: "select",
            options: [
              {
                label: "News",
              },
              {
                label: "Marketing",
              },
              {
                label: "Lifestyle",
              },
            ],
            value: "",
            // Logic that handles visibility
          },
        ],
      },
    ],
  },
];
export default wizardJSON;
