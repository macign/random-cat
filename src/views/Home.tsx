import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Details from "../components/Details";
import Header from "../components/Header";
import Cats from "../components/Cats";

export interface CatBreed {
  id: string;
  name: string;
  description: string;
  origin: string;
  temperament: string;
}

export interface Cat {
  id: string;
  url: string;
  height: number;
  width: number;
  breeds: CatBreed[];
}

export default function Home() {
  return (
    <Router>
      <div className="py-4">
        <Container>
          <Switch>
            <Route path="/" exact>
              <Header />
              <Cats />
            </Route>
            <Route path="/:id">
              <Details />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
