import React, { PureComponent } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

class Select extends PureComponent {
  renderOption(options) {
    // This method renders options for a select
    return options.map((option, index) => (
      <option key={`option${index + 1}`}>{option.label}</option>
    ));
  }

  render() {
    const { field, handleChange, handleBlur } = this.props;
    return (
      <Form.Group className="mb-3">
        <FloatingLabel
          label={field.required ? `${field.label} *` : field.label}
        >
          <Form.Select
            id={field.id}
            required={field.required}
            value={field.value}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={field.validity ? "" : "true"}
          >
            {this.renderOption(field.options)}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
    );
  }
}

export default Select;
