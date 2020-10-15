import React, { useState } from "react";
import styled from "styled-components";
import Draggable, { DraggableCore } from "react-draggable";

const Wrapper = styled.div`
  height: 100vh;
  background: #30404d;
  color: #defff2;
`;

const Card = styled.div`
  display: inline-block;
  height: 200px;
  width: 100px;
  background: white;
  margin: 2px;
`;
const CardPlaceHolder = styled.div`
  display: inline-block;
  position: absolute;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y}px`};
  height: 200px;
  width: 100px;
  background: blue;
  margin: 2px;
`;

function handleDrag(x, y, z) {
  // console.log("handleDrag", x, y, z);
}

const AbilityCardsApp = () => {
  let arr = [1, 1];
  let [placeholders, setPlaceholders] = useState([]);

  function handleStart(x, y, z) {
    console.log("x", x, "y", y.node.getBoundingClientRect());
    setPlaceholders(
      placeholders.concat({
        x: y.node.getBoundingClientRect().x,
        y: y.node.getBoundingClientRect().y,
      })
    );
  }

  console.log("placeholders", placeholders);

  return (
    <Wrapper>
      {placeholders.map((placeholder) => {
        console.log("placeholder", placeholder);
        return <CardPlaceHolder x={placeholder.x} y={placeholder.y} />;
      })}
      {arr.map((el) => (
        <Draggable
          onStart={handleStart}
          onDrag={handleDrag}
          // onStop={handleStop}
        >
          <Card />
        </Draggable>
      ))}
    </Wrapper>
  );
};

export default AbilityCardsApp;
