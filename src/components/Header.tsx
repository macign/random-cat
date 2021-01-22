import React from "react";
import { Row, Form, Col } from "react-bootstrap";

export default function Header() {
  return (
    <div>
      <h1>Cat Browser</h1>
      <Row>
        <Col md="3" sm="6">
          <Form.Group controlId="formGridState">
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" defaultValue="Select breed">
              <option>Select breed</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
