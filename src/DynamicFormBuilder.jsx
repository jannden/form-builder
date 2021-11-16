import React, { Component, createRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";

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

  renderOption(options) {
    // This method renders options for a select
    return options.map((option, index) => (
      <option key={`option${index + 1}`}>{option.label}</option>
    ));
  }

  renderInput(field, index) {
    const { fields } = this.state;
    return (
      <Form.Group key={index} className="mb-3">
        <Form.Label>
          {field.required ? `${field.label} *` : field.label}
        </Form.Label>
        <Form.Control
          type={field.type}
          placeholder={field.placeholder}
          id={field.id}
          data-index={index.toString()}
          required={field.required}
          value={fields[index].value}
          onChange={this.handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please fill out this field in proper format.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }

  renderSelect(field, index) {
    const { fields } = this.state;
    return (
      <Form.Group key={index} className="mb-3">
        <FloatingLabel
          label={field.required ? `${field.label} *` : field.label}
        >
          <Form.Select
            id={field.id}
            data-index={index.toString()}
            required={field.required}
            value={fields[index].value}
            onChange={this.handleChange}
          >
            {this.renderOption(field.options)}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
    );
  }

  renderCheckbox(field, index) {
    const { fields } = this.state;
    return (
      <Form.Group key={index} className="mb-3">
        <Form.Check
          id={field.id}
          type="checkbox"
          label={field.required ? `${field.label} *` : field.label}
          data-index={index.toString()}
          required={field.required}
          value={fields[index].value}
          onChange={this.handleChange}
        />
      </Form.Group>
    );
  }

  renderTextarea(field, index) {
    const { fields } = this.state;
    return (
      <Form.Group key={index} className="mb-3">
        <FloatingLabel
          label={field.required ? `${field.label} *` : field.label}
        >
          <Form.Control
            id={field.id}
            as="textarea"
            data-index={index.toString()}
            required={field.required}
            value={fields[index].value}
            onChange={this.handleChange}
            style={{ height: "100px" }}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field.
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
    );
  }

  renderFile(field, index) {
    return (
      <Form.Group key={index} className="mb-3">
        <Form.Label>
          {field.required ? `${field.label} *` : field.label}
        </Form.Label>
        <Form.Control
          type="file"
          id={field.id}
          data-index={index.toString()}
          required={field.required}
          onChange={this.handleChange}
          ref={this.fileInputs[field.id]}
        />
        <Form.Control.Feedback type="invalid">
          Please choose a file.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }

  renderForm() {
    // This method renders all fields of the form
    const { fields } = this.state;
    const form = fields.map((field, index) => {
      if (this.displayThisField(field)) {
        if (field.type === "text" || field.type === "email") {
          return this.renderInput(field, index);
        }
        if (field.type === "select") {
          return this.renderSelect(field, index);
        }
        if (field.type === "checkbox") {
          return this.renderCheckbox(field, index);
        }
        if (field.type === "textarea") {
          return this.renderTextarea(field, index);
        }
        if (field.type === "file") {
          return this.renderFile(field, index);
        }
        return (
          <Alert variant="warning">
            Not rendered:
            {field.type}
          </Alert>
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
