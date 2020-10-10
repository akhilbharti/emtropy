import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch,useSelector } from 'react-redux';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import styled from 'styled-components';
import { animateScroll as scroll } from 'react-scroll';

import { getNewsSearch, clearNews } from '../store/actions';
import NewsList from '../components/NewsList';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Search = (props) => {
    const dispatch = useDispatch();
    const { loading, articles } = useSelector((state) => state.news);
    const {match}=props
  const { query } = match.params;

  console.log('%c⧭', 'color: #aa00ff', query);
  // const params = queryString.parse(location.search);


  // Fetch movies hook
  // useFetchMoviesSearch(query, getMoviesSearch, params, clearMovies);

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
    });
    dispatch(getNewsSearch(query));
    return () => dispatch(clearNews());
  }, [query, dispatch]);

  // If loading
  if (loading) {
    return <Loader />;
  }

  //If there are no results
  else if (articles.length === 0) {
    return (
      <NotFound
        title="Sorry!"
        subtitle={`There were no results for ${query}...`}
      />
    );
  }

  // Else show the results
  else {
    return (
      <Wrapper>
        <Helmet>
          <title>{`${query} - search results`}</title>
        </Helmet>
        <Header title={query} subtitle="search results" />
        <NewsList articles={articles} />;
      </Wrapper>
    );
  }
};



export default (Search);
