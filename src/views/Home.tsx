import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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

export default function Home() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [breed, setBreed] = useState<CatBreed | null>(null);

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

  const onSelectBreed = (value: any) => {
    setBreed(value);
  };

  return (
    <div className="pt-4">
      <Container>
        <Header onSelectBreed={onSelectBreed} breeds={breeds} />
        {breed === null ? "No cats available" : breed}
      </Container>
    </div>
  );
}
