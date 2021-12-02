import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Form components
import FormComponents from "./formComponents/FormComponents";

const DynamicFormBuilder = function DynamicFormBuilder(props) {
  // This will serve for useRef for file inputs (we don't know how many file inputs will the formJSON require)
  let fileInputs = React.useRef({});

  // HTML5 form validation with Bootstrap (used in addition to the internal validation done in the internalValidation method)
  const [bootstrapValidated, setBootstrapValidated] = React.useState(false);

  // Initialize fields with default values
  const [formJSON] = props;
  const [fields, setFields] = React.useState(() =>
    formJSON[0].fields.map((field) => {
      // We will be adding default validity parameter to each field
      if (field.type === "select" && field.value === "") {
        // Also, we will set the default value for select (=first option label)
        return { ...field, value: field.options[0].label, validity: true };
      }
      if (field.type === "checkbox" && field.value === "") {
        // and for checkbox (=false) if those values are missing
        return { ...field, value: false, validity: true };
      }
      if (field.type === "file") {
        // Let's use this mapping for setting Refs as well
        fileInputs = {
          ...fileInputs,
          [field.id]: React.createRef(),
        };
        return { ...field, value: "", validity: true };
      }
      return { ...field, validity: true };
    })
  );

  const displayThisField = React.useCallback(
    (field) => {
      // This method is for conditional logic of showing an extra field if a checkbox is checked
      // If a field has the property showIfChecked, we verify the checkbox it points to,
      // whether it is checked, and decide whether to show the field or not
      if (field.showIfChecked) {
        const checkboxStatus = fields.find(
          (el) => el.id === field.showIfChecked
        ).value;
        if (checkboxStatus === false) {
          return false;
        }
      }
      return true;
    },
    [fields]
  );

  const handleSubmit = React.useCallback(
    (event) => {
      // Prevent form submit
      event.preventDefault();

      // HTML5 form validation with Bootstrap
      setBootstrapValidated(true);
      if (event.currentTarget.checkValidity() === false) {
        console.log("There are invalid fields!");
        event.stopPropagation();
        return false;
      }

      // Internal validation
      const invalidFieldsCount = fields.filter(
        (field) => field.validity === false
      ).length;
      if (invalidFieldsCount !== 0) {
        console.log("There are invalid fields!");
        event.stopPropagation();
        return false;
      }

      // Parsing the final data
      const result = fields
        .map((field) => {
          if (displayThisField(field)) {
            return { [field.id]: field.value };
          }
          return false;
        })
        .filter((field) => field);

      // Print the result
      console.log(result);
      return false;
    },
    [displayThisField, fields]
  );

  const handleChange = React.useCallback(
    (event) => {
      // Prepare values first
      let value;
      if (event.target.type === "checkbox") {
        // For checkbox, we get values from event.target.checked
        value = event.target.checked;
      } else if (event.target.type === "file") {
        // For file, we get if from Refs
        value = fileInputs[event.target.id].current.files[0]
          ? fileInputs[event.target.id].current.files[0].name
          : "";
      } else {
        // For input["text", "email"], textarea, and select, we get if from event.target.value
        value = event.target.value;
      }

      // Update state with new values based on IDs
      setFields(
        fields.map((field) => {
          if (field.id === event.target.id) {
            // We found the field that is being edited
            // Send updated data
            return { ...field, value };
          }
          // If this field is not edited, just return the old data
          return field;
        })
      );
    },
    [fields, fileInputs]
  );

  const handleBlur = React.useCallback(
    (event) => {
      // We do internal validation on Blur here
      const { value } = event.target;
      setFields(
        fields.map((field) => {
          if (
            field.id === event.target.id &&
            field.required &&
            displayThisField(field)
          ) {
            // We found the field that is being edited and should be validated
            let validity = true;
            switch (field.type) {
              case "email":
                validity = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
                break;
              default:
                validity = value !== "";
            }
            // Send updated data
            return { ...field, value, validity };
          }
          // If it's not the correct field, just return the old data
          return field;
        })
      );
    },
    [displayThisField, fields]
  );

  const renderForm = () => {
    // This method renders all fields of the form
    const form = fields.map((field) => {
      if (displayThisField(field)) {
        const capitalizedType =
          field.type.charAt(0).toUpperCase() + field.type.slice(1);
        const DesiredComponent = FormComponents[capitalizedType];
        return (
          <DesiredComponent
            key={field.id}
            field={field}
            handleChange={handleChange}
            handleBlur={handleBlur}
            fileInputs={fileInputs}
          />
        );
      }
      return null;
    });
    if (form.length) return form;
    return <Alert variant="danger">No fields available.</Alert>;
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={bootstrapValidated}>
      {renderForm}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DynamicFormBuilder;
