const formJSON = [
  {
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
        placeholder: "Enter your last name ...",
        type: "text",
        value: "",
      },
      {
        id: "country",
        label: "Country",
        required: true,
        type: "select",
        options: [
          { label: "Bulgaria" },
          { label: "Greece" },
          { label: "Romania" },
          { label: "Serbia" },
        ],
        value: "",
      },
      {
        id: "message",
        label: "Your message",
        required: true,
        type: "textarea",
        value: "",
      },
      {
        id: "subscribe",
        label: "Subscribe to newsletter",
        type: "checkbox",
        value: "",
      },
      {
        id: "emailAddress",
        label: "Email address",
        required: true,
        placeholder: "Enter your email address ...",
        type: "email",
        value: "",
        showIfChecked: "subscribe",
      },
      {
        id: "avatar",
        label: "Your main avatar",
        required: true,
        type: "file",
      },
      {
        id: "avatar2",
        label: "Your optional second avatar",
        type: "file",
      },
    ],
  },
];
export default formJSON;
