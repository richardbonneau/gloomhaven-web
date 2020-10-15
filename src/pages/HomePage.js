import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function HomePage() {
  return <Redirect to="/abilities" />;
}
export default HomePage;
