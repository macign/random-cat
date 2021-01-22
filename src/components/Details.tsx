import React from "react";
import { Button, Card } from "react-bootstrap";
import { Cat } from "../views/Home";

interface DetailsProps {
  cat: Cat;
  onBack: Function;
}

export default function Details({ cat, onBack }: DetailsProps) {
  return (
    <Card>
      <Card.Header>
        <Button onClick={() => onBack()}>Back</Button>
      </Card.Header>
      <Card.Img variant="top" src={cat.url} height="300" />
      <Card.Body>
        <Card.Title>{cat.breeds[0].name}</Card.Title>
        <h5>Origin: {cat.breeds[0].origin}</h5>
        <h6>{cat.breeds[0].temperament}</h6>
        <Card.Text>{cat.breeds[0].description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
