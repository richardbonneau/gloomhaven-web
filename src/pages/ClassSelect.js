import React, { useState } from "react";
import styled from "styled-components";
import { Dialog, Button, Icon } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const Wrapper = styled.div`
  min-height: 100vh;
  span {
    margin: 5px;
  }
`;
const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DialogText = styled.p`
  margin: 20px;
`;
const CardsSelectedLabel = styled.h3`
  margin: 0;
`;
const CardsSelectedValues = styled.h3`
  text-align: center;
`;
const DeckHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;
const Card = styled.div`
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  margin: 5px;
  box-sizing: content-box;
  position: relative;
  height: ${(props) => `${props.cardSize * 500}px`};
  width: ${(props) => `${props.cardSize * 333}px`};
  background-color: white;
  background-image: ${(props) =>
    `url(/images/cards/${props.selectedClass.toUpperCase()}/${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: ${(props) => (!props.isSelected ? `inset 0 0 0 1000px rgba(6, 0, 0, 0.4)` : "none")};

  .bp3-icon {
    position: absolute;
    color: white;
    right: 10px;
    box-shadow: inset 0 0 0 1000px rgba(6, 0, 0, 0.57);
    border: solid green 1px;
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

function ClassSelect({ setChosenCards, cardSize }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [classDeck, setClassDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [numOfCards, setNumOfCards] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  function query(classId) {
    switch (classId) {
      case "ti":
        return require.context(`../../public/images/cards/TI`, false, /.*\.png$/);

      default:
        return [];
    }
  }

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
      if (selectedCards.length < numOfCards) {
        setSelectedCards(selectedCards.concat(card));
      } else {
        setDialogOpen(true);
      }
    }
  }

  function classClicked(classId) {
    var req = query(classId);
    let classDeck = req.keys().map(function (key) {
      return key.slice(2);
    });
    let numCardsAllowed = characterClasses.find((cl) => cl.id === classId).numCardsAllowed;

    let allLevelOneCards = classDeck.filter((card, i) => {
      return i < numCardsAllowed;
    });
    setNumOfCards(numCardsAllowed);
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
        <TopWrapper>
          <CardsSelectedLabel>Cards Selected</CardsSelectedLabel>
          <CardsSelectedValues>
            {selectedCards.length} / {numOfCards}
          </CardsSelectedValues>
          <Button
            large={true}
            onClick={() =>
              setChosenCards({
                cards: selectedCards,
                characterClass: selectedClass.toUpperCase(),
              })
            }
          >
            Start Playing
          </Button>
        </TopWrapper>

        <DeckHolder>
          {classDeck.map((cardUrl, i) => (
            <Card
              cardSize={cardSize}
              isSelected={isPartOfSelectedCards(cardUrl)}
              selectedClass={selectedClass}
              key={`select${i}`}
              onClick={(ev) => addOrRemoveCardFromSelected(cardUrl)}
              image={cardUrl}
            >
              <Icon
                icon={isPartOfSelectedCards(cardUrl) ? "tick" : null}
                intent="success"
                iconSize={25}
              />
            </Card>
          ))}
        </DeckHolder>
        <Dialog
          // className={this.props.data.themeName}
          icon="error"
          onClose={() => setDialogOpen(false)}
          title="Too many cards selected"
          isOpen={dialogOpen}
          // {...this.state}
        >
          <div>
            <DialogText>
              <strong>You can't select more cards than what your class allows.</strong>
            </DialogText>
          </div>

          <CloseButtonWrapper>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </CloseButtonWrapper>
        </Dialog>
      </Wrapper>
    );
}

export default ClassSelect;
