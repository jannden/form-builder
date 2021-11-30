import React, { PureComponent } from "react";
import Form from "react-bootstrap/Form";

class Checkbox extends PureComponent {
  render() {
    const { field, handleChange } = this.props;
    return (
      <Form.Group className="mb-3">
        <Form.Check
          id={field.id}
          type={field.type}
          label={field.required ? `${field.label} *` : field.label}
          required={field.required}
          value={field.value}
          onChange={handleChange}
        />
      </Form.Group>
    );
  }
}

export default Checkbox;
