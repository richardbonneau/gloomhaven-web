import React, { useState } from "react";
import styled from "styled-components";
import { Dialog, Button, Icon } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center; */
  min-height: 100vh;
  span {
    margin: 5px;
  }
`;
const AmountOfThisCard = styled.div`
  position: absolute;
  color: white;
  right: 0;
  box-shadow: ${(props) => (props.isSelected ? `inset 0 0 0 1000px rgba(6,0,0,0.57)` : "none")};

  padding: 1px 6px;
`;
const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DialogText = styled.p`
  margin: 20px;
  text-align: center;
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
  height: ${(props) => `${props.cardSize * 300}px`};
  width: ${(props) => `${props.cardSize * 200}px`};
  background-color: #30404d;
  background-image: ${(props) =>
    `url(${process.env.PUBLIC_URL}/images/items/${props.selectedItemRange}/${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: ${(props) => (!props.isSelected ? `inset 0 0 0 1000px rgba(6, 0, 0, 0.5)` : "none")};
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
    text-align: center;
    width: 100%;
  }
`;
let itemRanges = [
  "1-14",
  "15-21",
  "22-28",
  "29-35",
  "36-42",
  "43-49",
  "50-56",
  "57-63",
  "64-151",
  "152-165",
];

function ItemSelect({ setChosenItems, cardSize }) {
  const [selectedItemRange, setSelectedItemRange] = useState("");
  const [itemsFromRange, setItemsFromRange] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  function query(classId) {
    switch (classId) {
      case "1-14":
        return require.context(`../../public/images/items/1-14`, false, /.*\.png$/);
      case "15-21":
        return require.context(`../../public/images/items/15-21`, false, /.*\.png$/);
      case "22-28":
        return require.context(`../../public/images/items/22-28`, false, /.*\.png$/);
      case "29-35":
        return require.context(`../../public/images/items/29-35`, false, /.*\.png$/);
      case "36-42":
        return require.context(`../../public/images/items/36-42`, false, /.*\.png$/);
      case "43-49":
        return require.context(`../../public/images/items/43-49`, false, /.*\.png$/);
      case "50-56":
        return require.context(`../../public/images/items/50-56`, false, /.*\.png$/);
      case "57-63":
        return require.context(`../../public/images/items/57-63`, false, /.*\.png$/);
      case "64-151":
        return require.context(`../../public/images/items/64-151`, false, /.*\.png$/);
      case "152-165":
        return require.context(`../../public/images/items/152-165`, false, /.*\.png$/);

      default:
        return [];
    }
  }

  function howManyOfThisCard(card) {
    console.log("howManyOfThisCard", card, "selectedCards", selectedCards);
    let count = 0;
    selectedCards.forEach((c) => {
      if (card === c.card) count++;
    });
    return count;
  }

  function isPartOfSelectedCards(card) {
    return selectedCards.find((c) => card === c.card);
  }
  function isItem(card) {
    let removeExt = card.split(".");
    let split = removeExt[0].split("-");
    let ret = split.some((word) => {
      console.log("word", word);
      if (
        word === "potion" ||
        word === "powder" ||
        word === "earring" ||
        word === "figuring" ||
        word === "ring" ||
        word === "lucky" ||
        word === "card" ||
        word === "censer" ||
        word === "gear" ||
        word === "compass" ||
        word === "remote" ||
        word === "betrayer" ||
        word === "crystal" ||
        word === "core" ||
        word === "idol" ||
        word === "scroll" ||
        word === "elixir" ||
        word === "utility"
      )
        return true;
      else return false;
    });
    if (ret === true && howManyOfThisCard(card) > 4) return false;
    else return ret;
  }
  function addOrRemoveCardFromSelected(card) {
    console.log("addOrRemoveCardFromSelected card", card);
    if (!isItem(card) && isPartOfSelectedCards(card)) {
      setSelectedCards(
        selectedCards.filter((element) => {
          return element.card !== card;
        })
      );
    } else {
      setSelectedCards(selectedCards.concat({ card, range: selectedItemRange }));
    }
  }

  function itemRangeClicked(itemRange) {
    var req = query(itemRange);
    let itemsFromRange = req.keys().map(function (key) {
      return key.slice(2);
    });

    setSelectedItemRange(itemRange);
    setItemsFromRange(itemsFromRange);
  }

  function renderItemRange(itemRange, { handleClick, modifiers }) {
    return (
      <Option onClick={() => itemRangeClicked(itemRange)}>
        <p>{itemRange}</p>
      </Option>
    );
  }

  return (
    <Wrapper>
      <Select filterable={false} items={itemRanges} itemRenderer={renderItemRange}>
        <Button intent="success" text={"Now choose your items"} />
      </Select>

      <TopWrapper>
        <CardsSelectedLabel>Cards Selected</CardsSelectedLabel>
        <CardsSelectedValues>{selectedCards.length}</CardsSelectedValues>
        <Button
          disabled={selectedCards.length < 1}
          large={true}
          onClick={() =>
            setChosenItems({
              cards: selectedCards,
            })
          }
        >
          Start Playing
        </Button>
      </TopWrapper>

      <DeckHolder>
        {itemsFromRange.map((cardUrl, i) => (
          <Card
            cardSize={cardSize}
            isSelected={isPartOfSelectedCards(cardUrl)}
            selectedItemRange={selectedItemRange}
            key={`select${i}`}
            onClick={(ev) => addOrRemoveCardFromSelected(cardUrl)}
            image={cardUrl}
          >
            <AmountOfThisCard isSelected={isPartOfSelectedCards(cardUrl)}>
              {howManyOfThisCard(cardUrl)}
            </AmountOfThisCard>
          </Card>
        ))}
      </DeckHolder>
      <Dialog
        icon="error"
        onClose={() => setDialogOpen(false)}
        title="Too many cards selected"
        isOpen={dialogOpen}
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

export default ItemSelect;
