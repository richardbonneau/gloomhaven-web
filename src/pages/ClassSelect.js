import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Navbar,
  Button,
  Alignment,
  NavbarHeading,
  NavbarGroup,
  MenuItem,
  Icon,
} from "@blueprintjs/core";
import { Select, ItemRenderer } from "@blueprintjs/select";

const Wrapper = styled.div`
  min-height: 100vh;
  span {
    margin: 5px;
  }
`;
const DeckHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Card = styled.div`
  transition: 0.2s ease-in-out all;
  border: ${(props) => (props.isSelected ? "solid green 4px" : "solid green 0px")};
  margin: ${(props) => (props.isSelected ? "2px" : "6px")};
  box-sizing: content-box;
  position: relative;
  height: 500px;
  width: 333px;
  background-color: white;
  background-image: ${(props) =>
    `url(/images/cards/${props.selectedClass.toUpperCase()}/${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;

  box-shadow: ${(props) => (props.used ? `inset 0 0 0 1000px rgba(6, 0, 0, 0.57)` : "none")};

  .bp3-icon {
    position: absolute;
    color: white;
    right: 10px;
    box-shadow: inset 0 0 0 1000px rgba(6, 0, 0, 0.57);
  }
`;
const Option = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  transition: 0.25s linear all;
  &:hover {
    background: grey;
  }

  img {
    height: 25px;
    margin-left: 10px;
  }
  p {
    color: white;
    margin: 7px 0;
    margin-right: 10px;
  }
`;

function ClassSelect({ setChosenCards }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [classDeck, setClassDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  function isPartOfSelectedCards(card) {
    return selectedCards.find((c) => card === c);
  }
  function addOrRemoveCardFromSelected(card) {
    if (isPartOfSelectedCards(card)) {
      setSelectedCards(
        selectedCards.filter((element) => {
          return element !== card;
        })
      );
    } else {
      setSelectedCards(selectedCards.concat(card));
    }
  }

  function query(classId) {
    switch (classId) {
      case "ti":
        return require.context(`../../public/images/cards/TI`, false, /.*\.png$/);
        break;
      default:
        return [];
        break;
    }
  }

  let characterClasses = [
    { numCardsAllowed: 12, id: "ti", label: "Tinkerer" },
    { numCardsAllowed: 9, id: "mt", label: "Mind Thief" },
    { numCardsAllowed: 9, id: "br", label: "Brute" },
    { numCardsAllowed: 9, id: "sw", label: "Spellweaver" },
    { numCardsAllowed: 9, id: "ch", label: "Cragheart" },
    { numCardsAllowed: 9, id: "sc", label: "Scoundrel" },
    { numCardsAllowed: 9, id: "be", label: "??" },
    { numCardsAllowed: 9, id: "bt", label: "??" },
    { numCardsAllowed: 9, id: "ds", label: "??" },
    { numCardsAllowed: 9, id: "el", label: "??" },
    { numCardsAllowed: 9, id: "ns", label: "??" },
    { numCardsAllowed: 9, id: "ph", label: "??" },
    { numCardsAllowed: 9, id: "qm", label: "??" },
    { numCardsAllowed: 9, id: "sb", label: "??" },
    { numCardsAllowed: 9, id: "sk", label: "??" },
    { numCardsAllowed: 9, id: "ss", label: "??" },
    { numCardsAllowed: 9, id: "su", label: "??" },
  ];

  function classClicked(classId) {
    var req = query(classId);
    let classDeck = req.keys().map(function (key) {
      return key.slice(2);
    });
    let numCardsAllowed = characterClasses.find((cl) => cl.id === classId).numCardsAllowed;
    console.log("numCardsAllowed", numCardsAllowed);
    let allLevelOneCards = classDeck.filter((card, i) => {
      return i < numCardsAllowed;
    });
    setSelectedClass(classId);
    setClassDeck(classDeck);
    setSelectedCards(allLevelOneCards);
  }
  function renderClass(characterClass, { handleClick, modifiers }) {
    return (
      <Option onClick={() => classClicked(characterClass.id)}>
        <img src={`/images/class-icons/${characterClass.id}.png`} />
        <p>{characterClass.label}</p>
      </Option>
    );
  }
  if (selectedClass === "")
    return (
      <Wrapper>
        <Select filterable={false} items={characterClasses} itemRenderer={renderClass}>
          <Button intent="success" text={"Select your Character Class"} />
        </Select>
      </Wrapper>
    );
  else
    return (
      <Wrapper>
        <DeckHolder>
          {classDeck.map((cardUrl, i) => (
            <Card
              isSelected={isPartOfSelectedCards(cardUrl)}
              selectedClass={selectedClass}
              key={i}
              onClick={(ev) => addOrRemoveCardFromSelected(cardUrl)}
              image={cardUrl}
            >
              <Icon icon={isPartOfSelectedCards(cardUrl) ? "tick" : null} iconSize={25} />
            </Card>
          ))}
        </DeckHolder>
      </Wrapper>
    );
}

export default ClassSelect;
