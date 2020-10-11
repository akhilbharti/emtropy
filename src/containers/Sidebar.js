import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

import Logo from '../components/Logo';
import GithubLogo from "../svg/github-logo.svg";
import MenuItem from '../components/MenuItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  padding: 2rem;
  margin-top: 4rem;
  color: var(--color-primary-dark);
  border-right: 1px solid var(--border-color);
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 4rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration: none;
  display: block;
  outline: none;
  margin-bottom: 0.5rem;
`;

const StyledCoffe = styled.a`
  display: flex !important;
  outline: none;
  justify-content: center !important;
  align-items: center !important;
  padding: 0.5rem 2rem;
  color: #000000;
  background-color: #ffffff;
  border-radius: 3px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid transparent;
  text-decoration: none;
  font-family: 'Montserrat';
  font-size: 1.2rem;
  letter-spacing: 0.6px;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  margin: 2rem auto;
  transition: 0.3s all linear;

  &img {
    width: 27px;
    box-shadow: none;
    border: none;
    vertical-align: middle;
  }

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
    opacity: 0.85;
    color: #000000;
  }
`;

const Svg = styled.img`
  max-width: 100%;
  height: 3rem;
`;

function Sidebar(){
  const { staticTopic, topics, selected } = useSelector(
    (state) => state.general
  );


  return (
    <StickyBox>
      <Wrapper>
        <Logo />
        <Heading>Top-headlines</Heading>
        {renderStatic(staticTopic, selected)}
        <Heading>Topic</Heading>
        {renderTopics(topics, selected)}
        <StyledCoffe>
          <Svg src={GithubLogo} alt="github repo" />
          <span style={{ marginLeft: "5px" }}>Akhil Bharti</span>
        </StyledCoffe>
        
      </Wrapper>
    </StickyBox>
  );
};

function renderStatic(categories, selected, setisOpened) {
  return categories.map((category, i) => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/top-headlines/${category}`}
      key={i}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={category}
        selected={category === selected ? true : false}
      />
    </LinkWrap>
  ));
}

function renderTopics(topics, selected, setisOpened) {
  return topics.map((topic) => (
    <LinkWrap
      to={`${process.env.PUBLIC_URL}/top-headlines/${topic.name}`}
      key={topic.id}
      onClick={setisOpened ? () => setisOpened(false) : null}
    >
      <MenuItem
        mobile={setisOpened ? 1 : 0}
        title={topic.name}
        selected={topic.name === selected ? true : false}
      />
    </LinkWrap>
  ));
}


export default (Sidebar);
