import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

// Form components
import Header from "./pageComponents/Header";
import Footer from "./pageComponents/Footer";
import FormComponents from "./formComponents/FormComponents";

// Logic
import paginationReducer from "./logic/paginationReducer";

const FormBuilder = function FormBuilder(props) {
  const { wizardJSON } = props;

  // This will serve for useRef for file inputs (we don't know how many file inputs will the formJSON require)
  const fileInputs = React.useRef({});

  const [output, setOutput] = React.useState("");

  const [data, setData] = React.useState(() =>
    wizardJSON[0].pages.map((page) => ({
      ...page,
      fields: page.fields.map((field) => {
        // We will be adding default validity parameter to each field
        if (field.type === "select" && field.value === "") {
          // Also, we will set the default value for select (=first option label)
          return { ...field, value: field.options[0].label, validity: true };
        }
        if (field.type === "checkbox" && field.value === "") {
          // and for checkbox (=false) if those values are missing
          return { ...field, value: false, validity: true };
        }
        if (field.type === "file") {
          // Let's use this mapping for setting Refs as well
          fileInputs.current = {
            ...fileInputs.current,
            [field.id]: React.createRef(),
          };
          return { ...field, value: "", validity: true };
        }
        return { ...field, validity: true, page: "" };
      }),
    }))
  );

  // Initialize pagination
  const [pagination, dispatchPagination] = React.useReducer(paginationReducer, {
    currentPage: 0,
    lastPage: data.length - 1,
  });

  const displayThisField = React.useCallback(
    (dependantField) => {
      // This method is for conditional logic of showing an extra field if a checkbox is checked
      // If a field has the property showIfChecked, we verify the checkbox it points to,
      // whether it is checked, and decide whether to show the field or not
      if (
        dependantField.showIfChecked &&
        data.some((page) =>
          page.fields.some(
            (mainField) =>
              mainField.id === dependantField.showIfChecked &&
              mainField.value === false
          )
        )
      ) {
        return false;
      }
      return true;
    },
    [data]
  );

  const fieldValidity = React.useCallback(
    (field, newValue) => {
      const value = typeof newValue === "undefined" ? field.value : newValue;
      if (field.required && displayThisField(field)) {
        switch (field.type) {
          case "email":
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
          default:
            return value !== "" && value !== false;
        }
      }
      return true;
    },
    [displayThisField]
  );

  const pageValidation = React.useCallback(
    (pageToValidate) => {
      let allValid = true;
      setData(
        data.map((page, index) => {
          if (pageToValidate === "all" || pageToValidate === index) {
            return {
              ...page,
              fields: page.fields.map((field) => {
                const validity = fieldValidity(field);
                if (!validity) allValid = false;
                return {
                  ...field,
                  validity,
                };
              }),
            };
          }
          return { ...page };
        })
      );
      return allValid;
    },
    [data, fieldValidity]
  );

  const handleSubmit = React.useCallback(
    (event) => {
      // Prevent form submit
      event.preventDefault();

      // Internal validation
      const allValid = pageValidation("all");

      if (!allValid) {
        console.log("There are invalid fields!");
        event.stopPropagation();
        return false;
      }

      // Parsing the final data
      const resultArray = data
        .map((page) =>
          page.fields.map((field) => {
            if (displayThisField(field)) {
              return { [field.id]: field.value };
            }
            return false;
          })
        )
        .flat()
        .filter((field) => field);

      // Flatten the fields into a single object
      const result = Object.assign(...resultArray);

      // Print the result
      console.log(result);
      setOutput(JSON.stringify(result, null, 2));
      return false;
    },
    [data, displayThisField, pageValidation]
  );

  const handleChange = React.useCallback(
    (event) => {
      // Prepare values first
      let value;
      if (event.target.type === "checkbox") {
        // For checkbox, we get values from event.target.checked
        value = event.target.checked;
      } else if (event.target.type === "file") {
        // For file, we get if from Refs
        value = fileInputs.current[event.target.id].current.files[0]
          ? fileInputs.current[event.target.id].current.files[0].name
          : "";
      } else {
        // For input["text", "email"], textarea, and select, we get if from event.target.value
        value = event.target.value;
      }

      // Update state with new values based on IDs
      setData(
        data.map((page) => ({
          ...page,
          fields: page.fields.map((field) => {
            if (field.id === event.target.id) {
              // We found the field that is being edited
              // Send updated data
              return { ...field, value, validity: fieldValidity(field, value) };
            }
            // If this field is not edited, just return the old data
            return field;
          }),
        }))
      );
    },
    [data, fieldValidity]
  );

  const renderForm = () => {
    // This method renders all fields of the form
    const form = data[pagination.currentPage].fields.map((field) => {
      if (displayThisField(field)) {
        const capitalizedType =
          field.type.charAt(0).toUpperCase() + field.type.slice(1);
        const DesiredComponent = FormComponents[capitalizedType];
        return (
          <DesiredComponent
            key={field.id}
            field={field}
            handleChange={handleChange}
            fileInputs={fileInputs}
          />
        );
      }
      return null;
    });
    if (form.length) return form;
    return <Alert variant="danger">No fields available.</Alert>;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} noValidate>
        <Card key={data[pagination.currentPage].title}>
          <Header title={data[pagination.currentPage].title} />
          <Card.Body>{renderForm()}</Card.Body>
          <Footer
            pagination={pagination}
            dispatchPagination={dispatchPagination}
            pageValidation={pageValidation}
          />
        </Card>
      </Form>
      <pre>{output}</pre>
    </div>
  );
};

export default FormBuilder;
