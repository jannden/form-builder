import React, { PureComponent } from "react";
import Form from "react-bootstrap/Form";

class File extends PureComponent {
  render() {
    const { field, handleChange, handleBlur, fileInputs } = this.props;
    return (
      <Form.Group className="mb-3">
        <Form.Label>
          {field.required ? `${field.label} *` : field.label}
          {field.validity.toString()}
        </Form.Label>
        <Form.Control
          type={field.type}
          id={field.id}
          required={field.required}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={fileInputs[field.id]}
          isInvalid={field.validity ? "" : "true"}
        />
        <Form.Control.Feedback type="invalid">
          Please choose a file.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default File;
