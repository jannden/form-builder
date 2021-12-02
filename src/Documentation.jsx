import React from "react";
import Alert from "react-bootstrap/Alert";

const Documentation = function Documentation() {
  return (
    <div>
      <h1>Welcome to the Dynamic Forms</h1>
      <p>
        It supports these standard field types: text input, select, checkbox.
      </p>
      <p>
        It supports these extra field types: email input, textarea, file upload.
      </p>
      <p>
        It also supports generic field visibility (for example the email field
        should be visible only when the subscribe checkbox is checked). Each
        field object can have a property <b>showIfChecked</b> which stores the
        ID of another field. For example if we set{" "}
        <code>showIfChecked: &quot;subscribe&quot;</code> to an email address
        field, we will show that field only if a checkbox with{" "}
        <code>id=&quot;subscribe&quot;</code> is checked.
      </p>
      <Alert variant="primary">
        <h2>New features added since last homework</h2>
        <ul>
          <li>
            Internal validation added (which completely replaced the Bootstrap
            HTML5 validation)
          </li>
          <li>Components are now broken down to individual files</li>
          <li>Rewritten from class to functional components</li>
          <li>
            Using hooks
            <ul>
              <li>useRef for field File</li>
              <li>
                useCallback is used to prevent reinitializing of functions
              </li>
              <li>useState is used for state management</li>
            </ul>
          </li>
          <li>
            A general module is used to dynamically recall the correct component
            and it can be found in{" "}
            <code>./formComponents/FormComponents.jsx</code>
          </li>{" "}
        </ul>
      </Alert>
    </div>
  );
};

export default Documentation;
