import React from 'react';
import styled from 'styled-components';

import NewsItem from "./NewsItem";
// import Pagination from './Pagination';

const NewsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 60rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 4rem 0;
  grid-gap: 4rem 2rem;

  @media ${props => props.theme.mediaQueries.small} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 23rem));
    justify-content: space-around;
    grid-gap: 4rem 1.5rem;
  }

  @media ${props => props.theme.mediaQueries.smaller} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 18rem));
    grid-gap: 4rem 1rem;
  }
`;

function NewsList({ articles}){
  if (articles.length === 0) {
    return null;
  }

  return (
    <>
      <NewsWrapper>
        {articles.map((article) => (
          <NewsItem
            article={article}
            key={article.publishedAt}
          />
        ))}
      </NewsWrapper>
      {/* <Pagination articles={articles} /> */}
    </>
  );
};

export default NewsList;
