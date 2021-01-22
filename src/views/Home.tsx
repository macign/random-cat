import React, { useState, useEffect, useReducer } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
  headers: { "x-api-key": "88a31046-1bab-4f4d-a49c-b389ac230e72" },
});

export interface CatBreed {
  id: string;
  name: string;
}

export interface Cat {
  id: string;
  url: string;
  height: number;
  width: number;
}

interface CatsActions {
  type: string;
  data: Cat[];
}

const catsReducer = (state: Cat[], action: CatsActions) => {
  switch (action.type) {
    case "add":
      return [...state, ...action.data];
    case "reset":
      return action.data;
    default:
      return state;
  }
};

export default function Home() {
  const [cats, dispatch] = useReducer(catsReducer, []);
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [breed, setBreed] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    api
      .get("breeds")
      .then((res) => {
        setBreeds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSelectBreed = (value: CatBreed) => {
    getCats(value.id);
  };

  const getCats = (id?: string) => {
    if (id === "Select breed") {
      setBreed(null);
      dispatch({ type: id ? "reset" : "add", data: [] });
      return;
    }

    if (id) {
      setBreed(id);
    }

    api
      .get(`/images/search?limit=10&page=${id ? 1 : page}&breed_id=${id ?? breed}`)
      .then((res) => {
        dispatch({ type: id ? "reset" : "add", data: res.data });
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCats = () =>
    cats.map((item, index) => (
      <Col className="col-md-3 col-sm-6 col-12 mb-2" key={index}>
        <Card>
          <Card.Img variant="top" src={item.url} height="300" />
          <Card.Body>
            <Button variant="primary" as={Col}>
              View Details
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));

  return (
    <div className="pt-4">
      <Container>
        <Header onSelectBreed={onSelectBreed} breeds={breeds} />
        <Row>{breed === null ? <Col className="col-md-3 col-sm-6 col-12 mb-2">No cats available</Col> : showCats()}</Row>
        <Button variant="success" onClick={() => getCats()} disabled={breed === null}>
          Load More
        </Button>
      </Container>
    </div>
  );
}
