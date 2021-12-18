import React from "react";

const DefaultField = function DefaultField(props) {
  const { field } = props;
  return <div>The element {field.type} is not supported.</div>;
};

export default DefaultField;
