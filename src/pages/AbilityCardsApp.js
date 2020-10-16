import React, { useState } from "react";
import styled from "styled-components";
import Play from "./Play";
import ClassSelect from "./ClassSelect";
import Draggable, { DraggableCore } from "react-draggable";
import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const AbilityCardsApp = () => {
  let [chosenCards, setChosenCards] = useState([]);
  if (chosenCards.length === 0) return <ClassSelect setChosenCards={setChosenCards} />;
  else return <Play chosenCards={chosenCards} />;
};

export default AbilityCardsApp;
