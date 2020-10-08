import * as TYPES from '../actions/types';

export default (state = { loading: true }, action) => {
  switch (action.type) {
    case TYPES.FETCH_NEWS_DISCOVER:
    case TYPES.FETCH_NEWS_SEARCH:
      return { ...state, ...action.payload };
    case TYPES.FETCH_NEWS_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_NEWS_FINISHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
