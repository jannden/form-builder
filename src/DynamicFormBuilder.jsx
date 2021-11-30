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
      // Form validation
      validated: false,

      // Form fields
      fields: props.formJSON[0].fields.map((field) => {
        // Let's set default value for select (=first option label)
        // and for checkbox (=false) if those values are missing
        if (field.type === "select" && field.value === "") {
          // Update state
          return { ...field, value: field.options[0].label };
        }
        if (field.type === "checkbox" && field.value === "") {
          // Update state
          return { ...field, value: false };
        }
        if (field.type === "file") {
          // Let's use this mapping for setting Refs as well
          this.fileInputs = {
            ...this.fileInputs,
            [field.id]: createRef(),
          };
          // Update state
          return { ...field, value: "" };
        }
        return field;
      }),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // Prevent form submit
    event.preventDefault();

    // Form validation first
    this.setState((prevState) => ({
      validated: true,
      fields: prevState.fields,
    }));
    if (event.currentTarget.checkValidity() === false) {
      event.stopPropagation();
      return false;
    }

    // Parsing the final data
    const { fields } = this.state;
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
      value = this.fileInputs[event.target.id].current.files[0].name
        ? this.fileInputs[event.target.id].current.files[0].name
        : "";
    } else {
      value = event.target.value;
    }

    // Update state with new values based on IDs
    this.setState((prevState) => ({
      validated: prevState.validated,
      fields: prevState.fields.map((field) =>
        field.id === event.target.id ? { ...field, value } : field
      ),
    }));
  }

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
    const { fields } = this.state;
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
            fileInputs={this.fileInputs}
          />
        );
      }
      return null;
    });
    if (form.length) return form;
    return <Alert variant="danger">No fields available.</Alert>;
  }

  render() {
    const { validated } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} noValidate validated={validated}>
        {this.renderForm()}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default DynamicFormBuilder;
