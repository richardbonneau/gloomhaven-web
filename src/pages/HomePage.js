import React from "react";
import { BrowserRouter, Route, Switch, Redirect, Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
`;
const Title = styled.h1`
  margin: 0;

  text-align: center;
  font-size: 5em;
  padding-top: 140px;
`;

const SubTitle = styled.h3`
  font-size: 3em;
  text-align: center;
  font-weight: 400;
  margin: 2em 1.5em;
`;
const TutorialButton = styled.a`
  background: black;
  display: flex;
  align-items: center;
  color: #e9e9e9;
  padding: 0.5em;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 40px;
  border-radius: 20px;
  border: 3px solid #a5a5a5;
  width: 13.6em;
  font-weight: 500;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;
const ButtonIcon = styled.img`
  height: 75px;
`;

const Hero = styled.section`
  background-image: url(/images/hero.jpg);

  background-size: cover;
  background-position: center;
  position: relative;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreImg = styled.img`
  width: 34em;
  margin-bottom: 40px;
`;
const Phones = styled.img`
  margin-top: 100px;
  bottom: 10px;
  width: 100%;
`;
function HomePage() {
  const history = useHistory();
  return (
    <Wrapper>
      <Hero>
        <Title>Gloomhaven Assistant</Title>
        <SubTitle>Play the #1 trending board game remotely with your friends</SubTitle>

        <TutorialButton target="_blank" href="https://www.youtube.com/watch?v=3lkyRDdiBro">
          <ButtonIcon src="/images/youtube.png" />
          Watch the Tutorial on YouTube
        </TutorialButton>
        <TutorialButton onClick={() => history.push("/abilities")}>
          <ButtonIcon src="/images/ability.png" />
          Launch the Ability Cards Tool
        </TutorialButton>
        <StoreImg src="/images/gstore.png" store="google" />
        <StoreImg src="/images/istore.png" />
        <Phones src="/images/phones.png" />
      </Hero>
      <Link to="/abilities">Go to abilities</Link>
      {/* <Redirect to="/abilities" /> */}
    </Wrapper>
  );
}
export default HomePage;
