import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar, Button, Alignment, NavbarHeading, NavbarGroup, MenuItem } from "@blueprintjs/core";
import { Select, ItemRenderer } from "@blueprintjs/select";

const Wrapper = styled.div`
  height: 100vh;
  span {
    margin: 5px;
  }
`;
const DeckHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Card = styled.div`
  transition: 0.25s linear all;
  border: ${(props) => (props.isSelected ? "solid green 5px" : "none")};
  position: relative;
  height: 500px;
  width: 333px;
  background-color: white;
  background-image: ${(props) =>
    `url(/images/cards/${props.selectedClass.toUpperCase()}/${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
  margin: 2px;
  box-shadow: ${(props) => (props.used ? `inset 0 0 0 1000px rgba(6, 0, 0, 0.57)` : "none")};

  .bp3-button.bp3-minimal {
    height: 40px;
    width: 40px;
    position: absolute;
    color: white;
    right: 10px;
    box-shadow: inset 0 0 0 1000px rgba(6, 0, 0, 0.57);
  }
  .bp3-button.bp3-minimal:hover {
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
    { id: "ti", label: "Tinkerer" },
    { id: "mt", label: "Mind Thief" },
    { id: "br", label: "Brute" },
    { id: "sw", label: "Spellweaver" },
    { id: "ch", label: "Cragheart" },
    { id: "sc", label: "Scoundrel" },
    { id: "be", label: "??" },
    { id: "bt", label: "??" },
    { id: "ds", label: "??" },
    { id: "el", label: "??" },
    { id: "ns", label: "??" },
    { id: "ph", label: "??" },
    { id: "qm", label: "??" },
    { id: "sb", label: "??" },
    { id: "sk", label: "??" },
    { id: "ss", label: "??" },
    { id: "su", label: "??" },
  ];

  function classClicked(classId) {
    console.log("howdy", classId);
    setSelectedClass(classId);
    console.log(query);
    var req = query(classId);
    setClassDeck(
      req.keys().map(function (key) {
        return key.slice(2);
      })
    );
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
              onClick={() => {
                console.log("ok");
              }}
              image={cardUrl}
            >
              <Button
                className="bp3-minimal"
                icon={isPartOfSelectedCards(cardUrl) ? "tick" : null}
                intent="success"
                onClick={(ev) => addOrRemoveCardFromSelected(cardUrl)}
              />
            </Card>
          ))}
        </DeckHolder>
      </Wrapper>
    );
}

export default ClassSelect;
