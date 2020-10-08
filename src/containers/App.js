import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "../history";
import { useDispatch,useSelector } from "react-redux";
import { init} from "../store/actions";

import Sidebar from "./Sidebar";
import MenuMobile from "./MenuMobile";
import Headlines from "./Headlines";
import Search from "./Search";

import ShowError from "./ShowError";

import NotFound from "../components/NotFound";
import SearchBar from "../components/SearchBar";
import ShortBy from "../components/ShortBy";
import Loader from "../components/Loader";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  faStar as fasFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";

library.add(
  fab,
  faArrowLeft,
  faArrowRight,
  faHome,
  faCalendar,
  faPoll,
  faHeart,
  faDotCircle,
  fasFaStar,
  farFaStar,
  faSearch,
  faChevronRight,
  faChevronLeft,
  faLink,
  faPlay
);

const MainWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  position: relative;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  user-select: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 4rem;

  @media ${(props) => props.theme.mediaQueries.larger} {
    padding: 6rem 3rem;
  }

  @media ${(props) => props.theme.mediaQueries.large} {
    padding: 4rem 2rem;
  }
`;

const SearhBarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  display:flex;
`;

const App = () => {
  const dispatch = useDispatch()
  const {loading,countries,lang} = useSelector(state => state.general)
  const [isMobile, setisMobile] = useState(null);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);
  // Set amount of items to show on slider based on the width of the element
  const changeMobile = () => {
    window.matchMedia("(max-width: 80em)").matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener("resize", changeMobile);
    return () => window.removeEventListener("resize", changeMobile);
  }, []);

  return loading ? (
    <ContentWrapper>
      <Loader />
    </ContentWrapper>
  ) : (
    <Router history={history}>
      <React.Fragment>
        <MainWrapper isMobile={isMobile}>
          {isMobile ? (
            <MenuMobile />
          ) : (
            <>
              <Sidebar />
              <SearhBarWrapper>
                <SearchBar />
                <ShortBy options={countries} action="country" />
                <ShortBy options={lang} action="language" />
              </SearhBarWrapper>
            </>
          )}
          <ContentWrapper>
            <Switch>
              <Route
                path={process.env.PUBLIC_URL + "/"}
                exact
                render={() => (
                  <Redirect
                    from={process.env.PUBLIC_URL + "/"}
                    to={process.env.PUBLIC_URL + "/top-headlines/breaking-news"}
                  />
                )}
              />

              <Route
                path={process.env.PUBLIC_URL + "/top-headlines/:name"}
                exact
                component={Headlines}
              />
              <Route
                path={process.env.PUBLIC_URL + "/search/:query"}
                exact
                component={Search}
              />

              <Route
                path="/404"
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
              <Route
                path={process.env.PUBLIC_URL + "/error"}
                component={ShowError}
              />
              <Route
                component={() => (
                  <NotFound title="Upps!" subtitle={`This doesn't exist...`} />
                )}
              />
            </Switch>
          </ContentWrapper>
        </MainWrapper>
      </React.Fragment>
    </Router>
  );
};



export default (App);
