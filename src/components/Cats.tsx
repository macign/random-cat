import React, { useEffect, useReducer, useState, useCallback } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CatBreed } from "../views/Home";
import api from "../services/axios";

export interface Cat {
  id: string;
  url: string;
  height: number;
  width: number;
  breeds: CatBreed[];
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

export default function Cats() {
  let location = useLocation();

  const [cats, dispatch] = useReducer(catsReducer, []);
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>("reset");
  const [breed, setBreed] = useState<string | null>(null);

  const getCats = useCallback(() => {
    if (breed !== "" && breed) {
      api
        .get(`/images/search?limit=10&page=${page}&breed_id=${breed}`)
        .then((res) => {
          console.log(res.headers);

          dispatch({ type, data: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch({ type, data: [] });
    }
  }, [page, breed, type]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const breed = searchParams.get("breed");
    setBreed(breed);
    setPage(1);
  }, [location.search]);

  useEffect(() => {
    getCats();
  }, [breed, getCats]);

  const loadMore = () => {
    setType("add");
    setPage(page + 1);
  };

  return (
    <div>
      <Row>
        {cats.length === 0 ? (
          <Col className="col-md-3 col-sm-6 col-12 mb-2"> No available cats</Col>
        ) : (
          cats.map((item, index) => (
            <Col className="col-md-3 col-sm-6 col-12 mb-2" key={index}>
              <Card>
                <Card.Img variant="top" src={item.url} height="300" />
                <Card.Body>
                  <Link to={`/${item.id}`} className="button">
                    <Button variant="primary" as={Col}>
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Button variant="success" onClick={loadMore} disabled={breed === null}>
        Load More
      </Button>
    </div>
  );
}
