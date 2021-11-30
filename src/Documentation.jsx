import React, { Component } from "react";

class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Dynamic Forms</h1>
        <p>
          It supports these standard field types: text input, select, checkbox.
        </p>
        <p>
          It supports these extra field types: email input, textarea, file
          upload.
        </p>
        <p>
          It also supports generic field visibility (for example the email field
          should be visible only when the subscribe checkbox is checked). Each
          field object can now have a property <b>showIfChecked</b> which stores
          the ID of another field. For example if we set{" "}
          <code>showIfChecked: &quot;subscribe&quot;</code> to an email address
          field, we will show that field only if a checkbox with{" "}
          <code>id=&quot;subscribe&quot;</code> is checked.
        </p>
        <h2>New</h2>
        <p>
          <strong>Added internal validation.</strong> In order to test it, first
          turn off the HTMl5 Bootstrap validation by removing the attribute{" "}
          <code>validated</code> from the <code>Form</code> tag in the{" "}
          <code>DynamicFormBuilder</code> component.
        </p>
      </div>
    );
  }
}

export default Documentation;
