import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Navbar,
  Button,
  Alignment,
  NavbarHeading,
  NavbarGroup,
  ControlGroup,
} from "@blueprintjs/core";

const Wrapper = styled.div`
  .bp3-navbar {
    background: #1d262e;
    color: #defff2;
  }
  .bp3-minimal {
    color: #defff2;
  }
`;

function NavBar() {
  return (
    <Wrapper>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Gloomhaven Assistant</NavbarHeading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="document" text="Files" />
        </NavbarGroup>
      </Navbar>
    </Wrapper>
  );
}

export default NavBar;
