import React from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// JSON
import wizardJSON from "./wizardJSON";

// Components
import FormBuilder from "./FormBuilder";

const App = function App() {
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <h3 className="text-center">Dynamic Multi-step Form Builder</h3>
            <FormBuilder wizardJSON={wizardJSON} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
