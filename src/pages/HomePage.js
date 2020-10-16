import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div>Home</div>
      <Link to="/abilities">Go to abilities</Link>
      {/* <Redirect to="/abilities" /> */}
    </>
  );
}
export default HomePage;
