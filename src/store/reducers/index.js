import { combineReducers } from "redux";
import configReducer from "./configReducer";
import errorsReducer from "./errorsReducer";
import newsReducer from "./newsReducer";
// import newsActionReducer from './newsActionReducer'


export default combineReducers({
  general: configReducer,
  news: newsReducer,
  // hidden: newsActionReducer,
  errors: errorsReducer,
});
