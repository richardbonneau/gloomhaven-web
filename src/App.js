import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AbilityCardsApp from "./pages/AbilityCardsApp";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/abilities" component={AbilityCardsApp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
