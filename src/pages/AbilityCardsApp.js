import React, { useState } from "react";
import styled from "styled-components";
import Play from "./Play";
import ClassSelect from "./ClassSelect";
import Draggable, { DraggableCore } from "react-draggable";
import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const AbilityCardsApp = ({ cardSize }) => {
  let [chosenCards, setChosenCards] = useState({ cards: [], characterClass: "" });
  if (chosenCards.cards.length === 0)
    return <ClassSelect cardSize={cardSize} setChosenCards={setChosenCards} />;
  else return <Play cardSize={cardSize} chosenCards={chosenCards} />;
};

export default AbilityCardsApp;
