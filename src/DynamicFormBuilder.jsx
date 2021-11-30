import React, { Component, createRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Form components
import FormComponents from "./formComponents/FormComponents";

class DynamicFormBuilder extends Component {
  constructor(props) {
    super(props);

    // Initialize refs for file inputs
    this.fileInputs = {};

    // Set state
    this.state = {
      // HTML5 form validation with Bootstrap
      // This is in addition to the internal validation done in the internalValidation method
      bootstrapValidated: false,

      // Form fields
      fields: props.formJSON[0].fields.map((field) => {
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
          this.fileInputs = {
            ...this.fileInputs,
            [field.id]: createRef(),
          };
          return { ...field, value: "", validity: true };
        }
        return { ...field, validity: true };
      }),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    const { fields } = this.state;

    // Prevent form submit
    event.preventDefault();

    // HTML5 form validation with Bootstrap
    this.setState((prevState) => ({
      bootstrapValidated: true,
      fields: prevState.fields,
    }));
    if (event.currentTarget.checkValidity() === false) {
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
        if (this.displayThisField(field)) {
          return { [field.id]: field.value };
        }
        return false;
      })
      .filter((field) => field);

    // Print the result
    console.log(result);
    return false;
  }

  handleChange(event) {
    // Prepare values first
    // For checkbox and radio, we get it from event.target.checked
    // For input["text", "email"], textarea, and select, we get if from event.target.value
    let value;
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else if (event.target.type === "file") {
      value = this.fileInputs[event.target.id].current.files[0]
        ? this.fileInputs[event.target.id].current.files[0].name
        : "";
    } else {
      value = event.target.value;
    }

    // Update state with new values based on IDs
    this.setState((prevState) => ({
      bootstrapValidated: prevState.bootstrapValidated,
      fields: prevState.fields.map((field) => {
        if (field.id === event.target.id) {
          // We found the field that is being edited

          // Send updated data
          return { ...field, value };
        }

        // If this field is not edited, just return the old data
        return field;
      }),
    }));
  }

  handleBlur(event) {
    // Update state with new validity based on IDs
    const { value } = event.target;
    this.setState((prevState) => ({
      bootstrapValidated: prevState.bootstrapValidated,
      fields: prevState.fields.map((field) => {
        if (
          field.id === event.target.id &&
          field.required &&
          this.displayThisField(field)
        ) {
          // We found the field that is being edited + which should be validated

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
      }),
    }));
  }

  /*
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
*/

  displayThisField(field) {
    // This method is for conditional logic of showing an extra field if a checkbox is checked
    // If a field has the property showIfChecked, we verify the checkbox it points to,
    // whether it is checked, and decide whether to show the field or not
    if (field.showIfChecked) {
      const { fields } = this.state;
      const checkboxStatus = fields.find(
        (el) => el.id === field.showIfChecked
      ).value;
      if (checkboxStatus === false) {
        return false;
      }
    }
    return true;
  }

  renderForm() {
    // This method renders all fields of the form
    const { fields, internalValidated } = this.state;
    const form = fields.map((field) => {
      if (this.displayThisField(field)) {
        const capitalizedType =
          field.type.charAt(0).toUpperCase() + field.type.slice(1);
        const DesiredComponent = FormComponents[capitalizedType];
        return (
          <DesiredComponent
            key={field.id}
            field={field}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            fileInputs={this.fileInputs}
            internalValidated={internalValidated}
          />
        );
      }
      return null;
    });
    if (form.length) return form;
    return <Alert variant="danger">No fields available.</Alert>;
  }

  render() {
    const { bootstrapValidated } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        noValidate
        validated={bootstrapValidated}
      >
        {this.renderForm()}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default DynamicFormBuilder;
