import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dialog, Navbar, Button, Alignment, NavbarHeading, NavbarGroup } from "@blueprintjs/core";
import Draggable from "react-draggable";

const Wrapper = styled.div`
  min-height: 100vh;
`;
const DialogText = styled.p`
  margin: 20px;
  text-align: center;
`;
const Token = styled.div`
  position: absolute;
  background-size: contain;
  left: ${(props) => `${props.pos}px`};
  background-image: ${(props) => `url(${process.env.PUBLIC_URL}/token.png)`};
  z-index: 100;
  height: ${(props) => `${props.cardSize * 60}px`};
  width: ${(props) => `${props.cardSize * 60}px`};
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 0 10px;
  }
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 25px 0;
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
    `url(${process.env.PUBLIC_URL}/images/cards/${props.characterClass.toUpperCase()}/${
      props.image
    })`};
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
  const [shortRestDialogOpen, setShortRestDialogOpen] = useState(false);
  const [randomCardDialog, setRandomCardDialog] = useState(false);

  const [deck, setDeck] = useState([]);
  const [characterClass, setCharacterClass] = useState("");
  const [cardToDelete, setCardToDelete] = useState("");

  console.log("cardToDelete", cardToDelete);

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
    setCardToDelete(card.url);
    setDialogOpen(true);
  }
  function aboutToShortRest() {
    const card = deck[Math.floor(Math.random() * deck.length)];
    setCardToDelete(card.url);
    setShortRestDialogOpen(true);
  }
  function deleteCard() {
    setDeck(
      deck.filter((card) => {
        return card.url !== cardToDelete;
      })
    );
    setCardToDelete("");
    setDialogOpen(false);
    setShortRestDialogOpen(false);
    setRandomCardDialog(false);
  }
  function parseCardName() {
    if (cardToDelete) {
      let cardName = cardToDelete.slice(2);
      cardName = cardName.substring(0, cardName.length - 4);
      let splittedCardName = cardName.split("-");
      splittedCardName = splittedCardName.map((word) => {
        let firstLetter = word[0].toUpperCase();
        let restOfWord = word.slice(1);
        return firstLetter + restOfWord;
      });
      cardName = splittedCardName.join(" ");

      return cardName;
    }
  }
  return (
    <Wrapper>
      <TopWrapper>
        <Draggable>
          <Token pos={50} cardSize={cardSize} />
        </Draggable>
        <Draggable>
          <Token pos={100} cardSize={cardSize} />
        </Draggable>
        <Draggable>
          <Token pos={150} cardSize={cardSize} />
        </Draggable>
        <Draggable>
          <Token pos={200} cardSize={cardSize} />
        </Draggable>
        <Draggable>
          <Token pos={250} cardSize={cardSize} />
        </Draggable>
        <Draggable>
          <Token pos={300} cardSize={cardSize} />
        </Draggable>
        <Button intent="warning" large={true} onClick={aboutToShortRest}>
          Short Rest (Remove a card at random)
        </Button>
      </TopWrapper>
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
          <Button
            large={true}
            intent="success"
            onClick={() => {
              setDialogOpen(false);
              setRandomCardDialog(true);
            }}
          >
            Yes
          </Button>
          <Button large={true} intent="danger" onClick={() => setDialogOpen(false)}>
            No
          </Button>
        </ButtonsWrapper>
      </Dialog>

      <Dialog
        icon="error"
        onClose={() => setShortRestDialogOpen(false)}
        title="Short Rest"
        isOpen={shortRestDialogOpen}
      >
        <div>
          <DialogText>
            <strong>Are you sure you want to burn a random card from your deck?</strong>
          </DialogText>
        </div>

        <ButtonsWrapper>
          <Button
            large={true}
            intent="success"
            onClick={() => {
              setShortRestDialogOpen(false);
              setRandomCardDialog(true);
            }}
          >
            Yes
          </Button>
          <Button large={true} intent="danger" onClick={() => setShortRestDialogOpen(false)}>
            No
          </Button>
        </ButtonsWrapper>
      </Dialog>

      <Dialog
        icon="error"
        onClose={() => setRandomCardDialog(false)}
        title="Card Burned"
        isOpen={randomCardDialog}
      >
        <div>
          <DialogText>
            <strong>{parseCardName()} was removed from your deck</strong>
          </DialogText>
        </div>

        <ButtonsWrapper>
          <Button large={true} intent="danger" onClick={() => deleteCard()}>
            Ok
          </Button>
        </ButtonsWrapper>
      </Dialog>
    </Wrapper>
  );
}

export default Play;
