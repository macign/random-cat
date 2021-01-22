import React from "react";
import { Row, Form, Col } from "react-bootstrap";

interface HeaderProps {
  onSelectBreed: Function;
  breeds: string[];
}

export default function Header({ onSelectBreed, breeds }: HeaderProps) {
  const selectBreed = (data: any) => {
    onSelectBreed(data.target.value);
  };

  return (
    <div>
      <h1>Cat Browser</h1>
      <Row>
        <Col md="3" sm="6">
          <Form.Group controlId="formGridState">
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" defaultValue="Select breed" onChange={selectBreed}>
              <option>Select breed</option>
              {breeds.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
