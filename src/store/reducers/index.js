import { combineReducers } from "redux";
import configReducer from "./configReducer";
import errorsReducer from "./errorsReducer";
import newsReducer from "./newsReducer";


export default combineReducers({
  general: configReducer,
  news: newsReducer,
  errors: errorsReducer,
});
