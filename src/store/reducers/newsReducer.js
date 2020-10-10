import * as TYPES from '../actions/types';

export default (state = { loading: true,hidden:{}, articles:[],totalArticles:"" }, action) => {
  switch (action.type) {
    case TYPES.FETCH_NEWS_DISCOVER:
    case TYPES.FETCH_NEWS_SEARCH:
      return { ...state, articles:[...action.payload.articles],totalArticles:action.payload.totalArticles };
    case TYPES.FETCH_NEWS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_NEWS_FINISHED:
      return { ...state, loading: false };
    case TYPES.HIDE_SELECTED_NEWS:
      let newState = { ...state };

      newState.hidden[action.payload] = true;
      newState.articles = newState.articles.filter(
        (article) => article.publishedAt !== action.payload
      );

      // localStorage.setItem("hidden", JSON.stringify(newState.hidden));
      return { ...newState };
    default:
      return state;
  }
};
