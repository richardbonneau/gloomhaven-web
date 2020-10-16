import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dialog, Navbar, Button, Alignment, NavbarHeading, NavbarGroup } from "@blueprintjs/core";

const Wrapper = styled.div`
  min-height: 100vh;
`;
const DialogText = styled.p`
  margin: 20px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const DeckHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    `url(/images/cards/${props.characterClass.toUpperCase()}/${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: ${(props) =>
    props.used ? `inset 0 0 0 1000px rgba(5, 5, 5, 0.8)!important` : "none"};

  &:hover {
    box-shadow: inset 0 0 0 1000px rgba(30, 30, 30, 0.9);
  }
  &:hover > .click-to-use {
    display: ${(props) => (props.used ? "none" : "block")};
  }
  .click-to-use {
    position: absolute;
    display: none;
    transform: translate(-50%, 50%);
    height: 100%;
    left: 50%;
    font-size: 19px;
    text-align: center;
  }

  .bp3-button {
    position: absolute;
    color: white;
    top: 10px;
    right: 10px;
    box-shadow: inset 0 0 0 1000px rgba(6, 0, 0, 0.57);
  }
`;

function Play({ chosenCards, cardSize }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  let [deck, setDeck] = useState([]);
  let [characterClass, setCharacterClass] = useState("");
  let [cardToDelete, setCardToDelete] = useState("");

  useEffect(() => {
    setCharacterClass(chosenCards.characterClass);
    setDeck(
      chosenCards.cards.map((card) => {
        return {
          url: card,
          used: false,
        };
      })
    );
  }, []);

  function cardClicked(clickedCard) {
    setDeck(
      deck.map((card) => {
        if (card.url === clickedCard.url) return { ...card, used: !clickedCard.used };
        else return card;
      })
    );
  }
  function aboutToDeleteCard(ev, card) {
    ev.stopPropagation();
    setCardToDelete(card);
    setDialogOpen(true);
  }
  function deleteCard() {
    setDeck(
      deck.filter((card) => {
        return card.url !== cardToDelete.url;
      })
    );
    setCardToDelete("");
    setDialogOpen(false);
  }
  return (
    <Wrapper>
      <DeckHolder>
        {deck.map((card, i) => (
          <Card
            key={`play${i}`}
            onClick={() => cardClicked(card)}
            image={card.url}
            used={card.used}
            characterClass={characterClass}
            cardSize={cardSize}
          >
            <div className="click-to-use">Click to use this card</div>
            <Button
              // className="bp3-minimal"
              icon="trash"
              intent="danger"
              onClick={(ev) => aboutToDeleteCard(ev, card)}
            />
          </Card>
        ))}
      </DeckHolder>
      <Dialog
        icon="error"
        onClose={() => setDialogOpen(false)}
        title="Burn Card"
        isOpen={dialogOpen}
      >
        <div>
          <DialogText>
            <strong>Are you sure you want to burn this card from your deck?</strong>
          </DialogText>
        </div>

        <ButtonsWrapper>
          <Button large={true} intent="success" onClick={() => deleteCard()}>
            Yes
          </Button>
          <Button large={true} intent="danger" onClick={() => setDialogOpen(false)}>
            No
          </Button>
        </ButtonsWrapper>
      </Dialog>
    </Wrapper>
  );
}

export default Play;
