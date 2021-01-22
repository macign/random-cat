import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

export default function Home() {
  const breeds: string[] = [];
  const onSelectBreed = (value: any) => {
    console.log(value);
  };

  return (
    <div className="pt-4">
      <Container>
        <Header onSelectBreed={onSelectBreed} breeds={breeds} />
      </Container>
    </div>
  );
}
