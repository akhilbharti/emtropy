import * as TYPES from "../actions/types";

export default ((state = { loading: true }, action)=>{
  switch (action.type) {
    case TYPES.SELECTED_MENU:
      return { ...state, 
        news: action.articles.filter(article=>article.source?.name.includes(action.payload)) };
    case TYPES.REMOVE_SELECTED_MENU:
      return { ...state, news: null };
  }
}