import React from "react";
import Form from "react-bootstrap/Form";

const File = function File(props) {
  const { field, handleChange, fileInputs } = props;
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
        ref={fileInputs.current[field.id]}
        isInvalid={field.validity ? "" : "true"}
      />
      <Form.Control.Feedback type="invalid">
        Please choose a file.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default File;
