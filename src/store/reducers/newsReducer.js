import * as TYPES from '../actions/types';

export default (state = { loading: true,hidden:{}, articles:[],totalArticles:"", likes:{}}, action) => {
  switch (action.type) {
    case TYPES.FETCH_NEWS_DISCOVER:
    case TYPES.FETCH_NEWS_SEARCH:
      return { ...state, articles:[...action.payload.articles],totalArticles:action.payload.totalArticles };
    case TYPES.FETCH_NEWS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_NEWS_FINISHED:
      return { ...state, loading: false };
    case TYPES.HIDE_SELECTED_NEWS:{
      let newState = { ...state };
      newState.hidden[action.payload] = true;
      newState.articles = newState.articles.filter(
        (article) => article.publishedAt !== action.payload
      );
      return { ...newState };
      }
      case TYPES.SET_LIKE_SELECTED:{
              let newState = { ...state };
      if (newState.likes[action.payload]) {
        delete newState.likes[action.payload];
        newState.articles.forEach((article) => {
          if (article.publishedAt === action.payload) article.isLiked = false;
        });
      } else {
        newState.likes[action.payload] = true;
        console.log({ likes: newState.likes });
        newState.articles.forEach((article) => {
          if (article.publishedAt === action.payload) article.isLiked = true;
        });
      }
      return { ...newState };
    }
    default:
      return state;
  }
};
