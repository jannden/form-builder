import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// JSON
import formJSON from "./formJSON";

// Components
import Documentation from "./Documentation";
import DynamicFormBuilder from "./DynamicFormBuilder";

const App = function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Documentation />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Dynamic Form Builder</h1>
            <DynamicFormBuilder formJSON={formJSON} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
