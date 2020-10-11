import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import { slide as Menu } from 'react-burger-menu';

import SearchBar from '../components/SearchBar';
import ShortBy from "../components/ShortBy";

import GithubLogo from "../svg/github-logo.svg";
import MenuItem from '../components/MenuItem';

const WrapperStickyBox = styled(StickyBox)`
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: var(--color-primary-lighter);
  box-shadow: 0 2px 40px var(--shadow-color);
`;

const Hamburguer = styled.div`
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-around;
  width: 25px;
  line-height: 1;
  height: auto;
  background-color: transparent;
  cursor: pointer;
`;

const Bar = styled.span`
  transition: all 0.3s;
  border-radius: 10px;
  margin: 2px 0;
  height: 4px;
  width: 100%;
  display: inline-block;
  background-color: var(--color-primary);
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

var styles = {
  bmBurgerButton: {
    display: 'none',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    marginRight: '1rem',
  },
  bmCross: {
    background: '#fafafa',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
  },
  bmMenu: {
    background: '#263238',
    overflowY: 'scroll',
    padding: '2.5em 1.5em',
  },
  bmItemList: {
    color: '#fafafa',
    padding: '0.8rem',
  },
  bmItem: {
    outline: 'none',
  },
  bmOverlay: {
    top: 0,
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const SearhBarWrapper = styled.div`
  position: absolute;
  right: 0;
  padding: 2rem;
  display: flex;
`;
function MenuMobile(){
    const { staticTopic, topics, selected, countries, lang } = useSelector(
      (state) => state.general
    );
  const [isOpened, setisOpened] = useState(false);

  const isMenuOpen = ({ isOpened }) => {
    setisOpened(isOpened);
  };

  return (
    <React.Fragment>
      <WrapperStickyBox>
        <Hamburguer onClick={() => setisOpened(true)}>
          <Bar />
          <Bar />
          <Bar />
        </Hamburguer>
        <SearhBarWrapper>
          <ShortBy options={countries} placeholder="Country" action="country" />
          <ShortBy options={lang} placeholder="Language" action="language" />
        </SearhBarWrapper>
      </WrapperStickyBox>
      <Menu isOpen={isOpened} onStateChange={isMenuOpen} styles={styles}>
        <SearchBar mobile={true} />

        <Heading>Top-headlines</Heading>
        {renderStatic(staticTopic, selected, setisOpened)}
        <Heading>Topic</Heading>
        {renderTopics(topics, selected, setisOpened)}
        <StyledCoffe>
          <Svg src={GithubLogo} alt="github repo" />
          <span style={{ marginLeft: "5px" }}>Akhil Bharti</span>
        </StyledCoffe>
      </Menu>
    </React.Fragment>
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

export default (MenuMobile);
