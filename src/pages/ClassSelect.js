import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar, Button, Alignment, NavbarHeading, NavbarGroup, MenuItem } from "@blueprintjs/core";
import { Select, ItemRenderer } from "@blueprintjs/select";

const Wrapper = styled.div`
  height: 100vh;
`;

function ClassSelect() {
  let characterClasses = ["Mind Thief", "Tinkerer"];

  function renderClass(characterClass, { handleClick, modifiers }) {
    return (
      <MenuItem
        key={characterClass}
        label={characterClass}
        text={characterClass}
        onClick={() => {
          console.log("oi", characterClass);
        }}
      />
    );
  }

  return (
    <Wrapper>
      <Select filterable={false} items={characterClasses} itemRenderer={renderClass}>
        <Button intent="success" text={"Select your Character Class"} />
      </Select>
    </Wrapper>
  );
}

export default ClassSelect;
