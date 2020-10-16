import React, { useState } from "react";
import styled from "styled-components";
import Play from "./Play";
import ClassSelect from "./ClassSelect";
import Draggable, { DraggableCore } from "react-draggable";
import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const AbilityCardsApp = () => {
  let [chooseCards, setChooseCards] = useState(true);

  if (chooseCards) return <ClassSelect />;
  else return <Play />;
};

export default AbilityCardsApp;
