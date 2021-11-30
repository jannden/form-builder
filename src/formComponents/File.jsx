import React, { PureComponent } from "react";
import Form from "react-bootstrap/Form";

class File extends PureComponent {
  render() {
    const { field, handleChange, fileInputs } = this.props;
    return (
      <Form.Group className="mb-3">
        <Form.Label>
          {field.required ? `${field.label} *` : field.label}
        </Form.Label>
        <Form.Control
          type={field.type}
          id={field.id}
          required={field.required}
          onChange={handleChange}
          ref={fileInputs[field.id]}
        />
        <Form.Control.Feedback type="invalid">
          Please choose a file.
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

export default File;
