import * as TYPES from "./types";
import gnewsAPI from "../../api/gnews";
import {countries,languages, topic} from '../../utils/constant'
import history from "../../history";

// When app inits
export const init = () => async (dispatch) => {
  dispatch({ type: TYPES.SET_LOADING });
  await dispatch(getLang());
  await dispatch(getCountries());
  await dispatch(getTopics());
  dispatch({ type: TYPES.REMOVE_LOADING });
};

// Action Creator to get the config object from the API
export const getLang = () =>(dispatch)=> {
  dispatch({
    type: TYPES.GET_LANG,
    payload:languages,
  });
};

export const getCountries = ()=>(dispatch)=> {
  dispatch({
    type: TYPES.GET_COUNTRIES,
    payload:countries
  });
};

export const setSelectedCountries=(record)=>dispatch=>{
  if (!record) {
    dispatch({ type: TYPES.REMOVE_SELECTED_COUNTRY });
  } else{
    dispatch({
      type: TYPES.SELECTED_COUNTRY,
      payload: record,
    });
  }
}

export const setSelectedLanguage = (record) => (dispatch) => {
  if (!record) {
    dispatch({ type: TYPES.REMOVE_SELECTED_LANGUAGE });
  } else {
    dispatch({
      type: TYPES.SELECTED_LANGUAGE,
      payload: record,
    });
  }
};



export const getTopics = () => (dispatch) => {
  dispatch({
    type: TYPES.GET_TOPICS,
    payload: topic,
  });
};
// Set the current selected menu (discover or genre), if is valid
export const setSelectedMenu = (name) => (dispatch, getState) => {
  const { staticTopic,topics } = getState().general;
  if (!name) {
    dispatch({ type: TYPES.REMOVE_SELECTED_MENU });
  } else if (
    staticTopic.find((category) => category === name) ||
    topics.find((topic) => topic.name === name)
  ) {
    dispatch({
      type: TYPES.SELECTED_MENU,
      payload: name,
    });
  } else {
    history.push(process.env.PUBLIC_URL + "/404");
  }
};

// Get News Headlines
export const getNewsHeadlines = (name) => async (dispatch, getState) => {
  const { selected, selectedCountry, selectedLanguage } = getState().general;
  if (!selected) {
    return;
  }
  try {
    dispatch({ type: TYPES.FETCH_NEWS_LOADING });
    const res = await gnewsAPI.get(`/top-headlines`, {
      params: {
        topic: name,
        lang: selectedLanguage.value,
        country: selectedCountry.value,
      },
    });
    await dispatch({
      type: TYPES.FETCH_NEWS_DISCOVER,
      payload: res.data,
    });
    dispatch({ type: TYPES.FETCH_NEWS_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};


// Set the current selected menu (discover or genre), if is valid
export const setSelectedArticles = (name) => (dispatch, getState) => {
  const { articles } = getState().news;
  if (!name) {
    dispatch({ type: TYPES.REMOVE_SELECTED_ARTICLE });
  } else if (articles.find((article) => article.source?.name === name)) {
    dispatch({
      type: TYPES.SELECTED_ARTICLE,
      payload: name,
      articles: articles,
    });
  } else {
    history.push(process.env.PUBLIC_URL + "/404");
  }
};


// Get movies search
export const getNewsSearch = (query) => async (dispatch,getState) => {
  const {selectedCountry, selectedLanguage } = getState().general;

  try {
    dispatch({ type: TYPES.FETCH_NEWS_LOADING });
    const res = await gnewsAPI.get(`/search`, {
      params: {
        q: query,
        lang: selectedLanguage.value,
        country: selectedCountry.value,
      },
    });
    await dispatch({
      type: TYPES.FETCH_NEWS_SEARCH,
      payload: res.data,
    });
    dispatch({ type: TYPES.FETCH_NEWS_FINISHED });
  } catch (err) {
    dispatch({ type: TYPES.INSERT_ERROR, payload: err.response });
    history.push(process.env.PUBLIC_URL + "/error");
  }
};

// Set loading to true for next render
export const clearNews = () => {
  return {
    type: TYPES.FETCH_NEWS_LOADING,
  };
};
// Clear error
export const clearError = () => ({ type: TYPES.CLEAR_ERROR });