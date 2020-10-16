import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar, Button, Alignment, NavbarHeading, NavbarGroup, Slider } from "@blueprintjs/core";
import "../App.css";
const Wrapper = styled.div`
  .bp3-navbar {
    background: #1d262e;
    color: #defff2;
    margin-bottom: 10px;
  }
  .bp3-minimal {
    color: #defff2;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  button {
    margin: 0 2px;
  }
`;
const Label = styled.div`
  margin: 0 10px;
`;

const NavHeading = styled.a`
  text-decoration: none !important;
  color: white;
`;

function NavBar({ getCardSize }) {
  const [cardSize, setCardSize] = useState(0.8);

  useEffect(() => {
    getCardSize(cardSize);
  }, [cardSize]);

  return (
    <Wrapper>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavHeading href="/">
            <NavbarHeading>Gloomhaven Assistant : Ability Cards</NavbarHeading>
          </NavHeading>
          <Navbar.Divider />
          <Label>Cards Size</Label>
          <ButtonsWrapper>
            <Button text={"Small"} onClick={() => setCardSize(0.4)} />
            <Button text={"Medium"} onClick={() => setCardSize(0.6)} />
            <Button text={"Large"} onClick={() => setCardSize(0.8)} />
            <Button text={"X-Large"} onClick={() => setCardSize(1)} />
          </ButtonsWrapper>
        </NavbarGroup>
      </Navbar>
    </Wrapper>
  );
}

export default NavBar;
