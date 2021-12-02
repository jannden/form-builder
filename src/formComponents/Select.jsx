import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const renderOption = (options) =>
  // This function renders options for a select
  options.map((option, index) => (
    <option key={`option${index + 1}`}>{option.label}</option>
  ));

const Select = function Select(props) {
  const { field, handleChange } = props;
  return (
    <Form.Group className="mb-3">
      <FloatingLabel label={field.required ? `${field.label} *` : field.label}>
        <Form.Select
          id={field.id}
          required={field.required}
          value={field.value}
          onChange={handleChange}
          isInvalid={field.validity ? "" : "true"}
        >
          {renderOption(field.options)}
        </Form.Select>
      </FloatingLabel>
    </Form.Group>
  );
};

export default Select;
