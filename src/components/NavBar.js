import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Navbar,
  Button,
  Alignment,
  NavbarHeading,
  NavbarGroup,
  ControlGroup,
} from "@blueprintjs/core";
function NavBar() {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.RIGHT} fixedToTop={true}>
        <NavbarHeading>Blueprint</NavbarHeading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" />
      </NavbarGroup>
    </Navbar>
  );
}

export default NavBar;
