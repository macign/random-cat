import React from "react";
import { Container } from "react-bootstrap";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="pt-4">
      <Container>
        <Header />
      </Container>
    </div>
  );
}
