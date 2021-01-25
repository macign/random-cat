import { useEffect, useState } from "react";
import { Row, Form, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { CatBreed } from "../views/Home";
import api from "../services/axios";

export default function Header() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const { search } = useLocation();

  const [breed, setBreed] = useState<number>(-1);
  const history = useHistory();

  const selectBreed = (data: any) => {
    const selectedBreed = breeds[data.target.value];
    history.push(selectedBreed?.id ? `/?breed=${selectedBreed.id}` : "/");
    setBreed(breeds.findIndex((e: any) => e.id === selectedBreed?.id));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const breedParam = searchParams.get("breed");
    api
      .get("breeds")
      .then((res) => {
        setBreeds(res.data);
        setBreed(res.data.findIndex((e: any) => e.id === breedParam));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);

  return (
    <div>
      <h1>Cat Browser</h1>
      <Row>
        <Col md="3" sm="6">
          <Form.Group controlId="formGridState">
            <Form.Label>Breed</Form.Label>
            <Form.Control as="select" value={breed} onChange={selectBreed} disabled={breeds.length === 0}>
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
