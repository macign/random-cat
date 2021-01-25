import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import api from "../services/axios";

export default function Details({ match }: any) {
  const { id }: any = useParams();
  const [cat, setCat] = useState<any>(null);

  useEffect(() => {
    api
      .get(`https://api.thecatapi.com/v1/images/${id}`)
      .then((res) => {
        setCat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Card>
      <Card.Header>
        <Link to={`/?breed=${cat?.breeds[0]?.id}`}>
          <Button>Back</Button>
        </Link>
      </Card.Header>
      <Card.Img variant="top" src={cat?.url} height="400" />
      <Card.Body>
        <Card.Title>{cat?.breeds[0]?.name}</Card.Title>
        <h5>Origin: {cat?.breeds[0]?.origin}</h5>
        <h6>{cat?.breeds[0]?.temperament}</h6>
        <Card.Text>{cat?.breeds[0]?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
