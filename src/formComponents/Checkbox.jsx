import React from "react";
import Form from "react-bootstrap/Form";

const Checkbox = function Checkbox(props) {
  const { field, handleChange } = props;
  return (
    <Form.Group className="mb-3">
      <Form.Check
        id={field.id}
        type={field.type}
        label={field.required ? `${field.label} *` : field.label}
        required={field.required}
        value={field.value}
        onChange={handleChange}
        isInvalid={field.validity ? "" : "true"}
      />
    </Form.Group>
  );
};

export default Checkbox;
