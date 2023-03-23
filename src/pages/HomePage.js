import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Hero = styled.section`
  background-image: url(/images/hero.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: rgb(19 19 19 / 90%) 0px 0px 0px 1000px inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const FirstSection = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 3em;
  padding-top: 0.5em;
  @media (min-width: 768px) {
    font-size: 2.5em;
    padding: 10px;
    .subtitle {
      margin: 1.5em 1.5em;
      font-size: 1.5em;
    }
  }

  .subtitle {
    display: block;
    font-size: 0.5em;
    text-align: center;
    font-weight: 400;
    max-width: 23em;
    margin: 2em 1.5em;
  }
`;

const TutorialButton = styled.a`
  background: black;
  display: flex;
  align-items: center;
  color: #f0f0f0;
  padding: 0.5em;
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 40px;
  border-radius: 10px;
  border: 2px solid #a5a5a5;
  width: 13.6em;
  font-weight: 500;
  &:hover {
    color: white;
    text-decoration: none;
  }

  @media (min-width: 768px) {
  }
`;
const ButtonIcon = styled.img`
  height: 2.5em;
`;

const StoreImg = styled.img`
  cursor: pointer;
  width: 20.5em;
  margin-bottom: 40px;
  @media (min-width: 768px) {
  }
`;
const Phones = styled.img`
  margin-top: 2em;
  bottom: 10px;
  width: 100%;
  @media (min-width: 768px) {
    width: 40em;
  }
`;
function HomePage() {
  const history = useHistory();
  return (
    <Hero>
      <FirstSection>
        <Title>
          Gloomhaven Assistant
          <span className="subtitle">
            Play the #1 trending board game remotely with your friends and keep track of enemies
            health, statuses and abilities.
          </span>
        </Title>
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.richard.gloomhaven_assistant&hl=en_CA&gl=US"
        >
          <StoreImg src="/images/gstore.png" store="google" />
        </a>
        <a target="_blank" href="https://apps.apple.com/ca/app/gloomhaven-assistant/id1532278677">
          <StoreImg target="_blank" href="/" src="/images/istore.png" />
        </a>
        <TutorialButton onClick={() => history.push("/abilities")}>
          <ButtonIcon src="/images/ability.png" />
          Launch the Ability Cards Tool
        </TutorialButton>
        {/* <TutorialButton target="_blank" href="https://www.youtube.com/watch?v=3lkyRDdiBro">
          <ButtonIcon src="/images/youtube.png" />
          Watch the Tutorial on YouTube
        </TutorialButton> */}
      </FirstSection>
      <Phones src="/images/phones.png" />
    </Hero>
  );
}
export default HomePage;
