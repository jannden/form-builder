import React, { PureComponent } from "react";
import Form from "react-bootstrap/Form";

class Email extends PureComponent {
  render() {
    const { field, handleChange } = this.props;
    return (
      <Form.Group className="mb-3">
        <Form.Label>
          {field.required ? `${field.label} *` : field.label}
        </Form.Label>
        <Form.Control
          type={field.type}
          placeholder={field.placeholder}
          id={field.id}
          required={field.required}
          value={field.value}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          Please fill out this field in proper format.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default Email;
