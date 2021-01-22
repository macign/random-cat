import React from "react";
import { Row, Form, Col } from "react-bootstrap";
import { CatBreed } from "../views/Home";

interface HeaderProps {
  onSelectBreed: Function;
  breeds: CatBreed[];
}

export default function Header({ onSelectBreed, breeds }: HeaderProps) {
  const selectBreed = (data: any) => {
    onSelectBreed(data.target.value >= 0 ? breeds[data.target.value] : { id: "Select breed" });
  };

  return (
    <div>
      <h1>Cat Browser</h1>
      <Row>
        <Col md="3" sm="6">
          <Form.Group controlId="formGridState">
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" onChange={selectBreed}>
              <option value={-1}>Select breed</option>
              {breeds.map((item, index) => (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
