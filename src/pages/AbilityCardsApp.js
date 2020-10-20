import React, { useState } from "react";
import styled from "styled-components";
import Play from "./Play";
import ClassSelect from "./ClassSelect";
import ItemSelect from "./ItemSelect";

const AbilityCardsApp = ({ cardSize }) => {
  let [chosenCards, setChosenCards] = useState({ cards: [], characterClass: "" });
  let [chosenItems, setChosenItems] = useState([]);

  if (chosenCards.cards.length === 0)
    return <ClassSelect cardSize={cardSize} setChosenCards={setChosenCards} />;
  else if (chosenItems.length === 0)
    return <ItemSelect setChosenItems={setChosenItems} cardSize={cardSize} />;
  else return <Play cardSize={cardSize} chosenCards={chosenCards} chosenItems={chosenItems} />;
};

export default AbilityCardsApp;
