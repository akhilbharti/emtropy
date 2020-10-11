import React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import {useDispatch,useSelector} from 'react-redux'
import Img from "react-cool-img";
import NothingSvg from '../svg/nothing.svg';
import PublishDate from './PublishDate';
import Loading from './Loading';
// import Rating from "../components/Rating";
import Button from "../components/Button";
import { hideSelectedNews,setLikeNews } from '../store/actions';


const NewsWrapper = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: transparent;
  border-radius: 0.8rem;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);

  &:hover {
    transform: scale(1.03);

    ::after {
      transform: scaleY(1);
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    background-color: var(--color-primary);
    z-index: -99;
    box-shadow: 0rem 2rem 5rem var(--shadow-color-dark);
    transition: all 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;

const NewsImg = styled(Img)`
  width: 100%;
  height: 35rem;
  display:block;
  object-fit: "cover";
  border-radius: 0.8rem;
  box-shadow: 0rem 2rem 5rem var(--shadow-color);
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${NewsWrapper}:hover & {
    border-radius: 0.8rem 0.8rem 0rem 0rem;
    box-shadow: none;
  }

  @media ${(props) => props.theme.mediaQueries.smaller} {
    height: 28rem;
  }
`;


const Title = styled.h2`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-primary-light);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  ${NewsWrapper}:hover & {
    color: var(--text-color);
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;

  @media ${props => props.theme.mediaQueries.smaller} {
    padding: 1.5rem 1.5rem;
  }
`;

const PublishedDateWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--color-primary);

  ${NewsWrapper}:hover & {
    color: var(--color-primary-lighter);
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  width: 120px;
  font-weight: 900;
  font-size: 1.1rem;
  background-color: var(--color-primary-light);
  color: var(--text-color);
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  position: absolute;
  z-index: 999;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
  transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    transition: all 200ms cubic-bezier(0.645, 0.045, 0.355, 1);
    border-color: var(--color-primary-light) transparent transparent transparent;
  }

  ${PublishedDateWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

// Function to render list of Newss
function NewsItem({article}){
const dispatch = useDispatch()
const likes = useSelector(state => state.news?.likes)

  return (
    <LazyLoad height={200} offset={200}>
      <NewsWrapper href={article.url} target="_blank" rel="noopener noreferrer">
       
        <NewsImg
        placeholder={ <Loading/>}
          error={NothingSvg}
          src={article.image}
          alt={article.title}
          // If no image, error will occurr, we set error to true
          // And only change the src to the nothing svg if it isn't already, to avoid infinite callback
        />
        <DetailsWrapper>
          <Title>{article.title}</Title>
          <PublishedDateWrapper>
            <PublishDate
              number={new Intl.DateTimeFormat("en-GB", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              }).format(new Date(article.publishedAt))}
            />
            <Tooltip>published on:- {article.source.name}</Tooltip>
          </PublishedDateWrapper>
          {/* card actions */}
          <PublishedDateWrapper>
            <Button
              title={likes[article.publishedAt] ? "Liked" : "Like"}
              solid
              icon={
                likes[article.publishedAt] ? ["fas", "heart"] : ["far", "heart"]
              }
              left
              colr={likes[article.publishedAt] ? "red" : null}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setLikeNews(article.publishedAt));
              }}
            />
            <Button
              title="hide"
              solid
              icon="eye-slash"
              left
              onClick={(e) => {
                e.preventDefault();
                dispatch(hideSelectedNews(article.publishedAt));
              }}
            />
          </PublishedDateWrapper>
        </DetailsWrapper>
      </NewsWrapper>
    </LazyLoad>
  );
};

export default (NewsItem);
