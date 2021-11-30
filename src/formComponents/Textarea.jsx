import React, { PureComponent } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

class Textarea extends PureComponent {
  render() {
    const { field, handleChange, handleBlur } = this.props;
    return (
      <Form.Group className="mb-3">
        <FloatingLabel
          label={field.required ? `${field.label} *` : field.label}
        >
          <Form.Control
            id={field.id}
            as={field.type}
            required={field.required}
            value={field.value}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ height: "100px" }}
            isInvalid={field.validity ? "" : "true"}
          />
          <Form.Control.Feedback type="invalid">
            Please fill out this field.
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
    );
  }
}

export default Textarea;
