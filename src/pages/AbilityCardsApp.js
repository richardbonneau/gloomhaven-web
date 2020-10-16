import React, { useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableCore } from "react-draggable";
import { Button } from "@blueprintjs/core";

const Wrapper = styled.div`
  height: 100vh;
`;

const DeckHolder = styled.div`
  display: flex;
`;

const Card = styled.div`
  position: relative;
  height: 500px;
  width: 333px;
  background-color: white;
  background-image: ${(props) => `url(/images/${props.image}.png)`};
  background-repeat: no-repeat;
  background-size: contain;
  margin: 2px;
  box-shadow: ${(props) => (props.used ? `inset 0 0 0 1000px rgba(6, 0, 0, 0.57)` : "none")};

  .bp3-button.bp3-minimal {
    position: absolute;
    color: white;
    right: 10px;
    box-shadow: inset 0 0 0 1000px rgba(6, 0, 0, 0.57);
  }
  .bp3-button.bp3-minimal:hover {
    box-shadow: inset 0 0 0 1000px rgba(6, 0, 0, 0.57);
  }
`;

const AbilityCardsApp = () => {
  let [deck, setDeck] = useState([
    { url: "card", used: false },
    { url: "card2", used: false },
  ]);

  function cardClicked(clickedCard) {
    setDeck(
      deck.map((card) => {
        if (card.url === clickedCard.url) return { ...card, used: !clickedCard.used };
        else return card;
      })
    );
  }
  function deleteCard(ev, deletedCard) {
    ev.stopPropagation();
    setDeck(
      deck.filter((card) => {
        return card.url !== deletedCard.url;
      })
    );
  }

  return (
    <Wrapper>
      <DeckHolder>
        {deck.map((card, i) => (
          <Card key={i} onClick={() => cardClicked(card)} image={card.url} used={card.used}>
            <Button
              className="bp3-minimal"
              icon="trash"
              intent="danger"
              onClick={(ev) => deleteCard(ev, card)}
            />
          </Card>
        ))}
      </DeckHolder>
    </Wrapper>
  );
};

export default AbilityCardsApp;
