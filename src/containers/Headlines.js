import React, { useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import { loadState } from "../utils/helper";
import Header from "../components/Header";
import styled from "styled-components";
import Loader from "../components/Loader"
import { setSelectedMenu, getNewsHeadlines, clearNews } from "../store/actions";

const NewsList = lazy(() => import("../components/NewsList"));


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
function Headlines(props) {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.general);
  const { loading, articles } = useSelector((state) => state.news);
  const { match } = props;
  const locastorageValue = loadState();
  console.log("%c⧭", "color: #e50000", locastorageValue);
  // Send url to setSelected Action Creator, it will check if is valid
  useEffect(() => {
    dispatch(setSelectedMenu(match.params.name));
    // Clean up to remove selected menu from state
    return () => dispatch(setSelectedMenu());
  }, [match.params.name, dispatch]);

  // Call useEffect to fetch topic headlines, pass in the url query

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });

    dispatch(getNewsHeadlines(match.params.name));
    return () => dispatch(clearNews());
  }, [match.params.name, match, dispatch]);

  // If loading
  if (loading) {
    return <Loader />;
  }

  // Else return articles list
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Top-Headlines`}</title>
      </Helmet>
      <Header title={selected} subtitle="Top-Headlines" />
      <Suspense fallback={<div>Loading...</div>}>
        <NewsList articles={articles} />
      </Suspense>
    </Wrapper>
  );
}

export default Headlines;
