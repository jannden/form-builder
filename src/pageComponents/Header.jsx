import React from "react";
import Card from "react-bootstrap/Card";

const Header = function Header(props) {
  const { title } = props;
  return <Card.Header>{title}</Card.Header>;
};

export default Header;
