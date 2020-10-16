import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AbilityCardsApp from "./pages/AbilityCardsApp";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const [cardSize, setCardSize] = useState(0);
  function getCardSize(size) {
    setCardSize(size);
  }
  return (
    <div className="app">
      <BrowserRouter>
        <NavBar getCardSize={getCardSize} />
        <AbilityCardsApp cardSize={cardSize} />
        {/* <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/abilities">
            <AbilityCardsApp cardSize={cardSize} />
          </Route>
        </Switch> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
