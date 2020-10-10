import * as TYPES from "../actions/types";

const initialState = {
 
  hidden: {},
  
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.HIDE_SELECTED_NEWS:
            let newState = { ...state };

      newState.hidden[action.payload] = true;
      // newState.articles = newState.articles.filter(
      //   (article) => article.publishedAt !== payload
      // );

      // localStorage.setItem("hidden", JSON.stringify(newState.hidden));
      return { ...newState};
    default:
      return state;
  }
};
