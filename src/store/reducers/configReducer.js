import * as TYPES from '../actions/types';

const INITIAL_STATE = {
  staticTopic: ["breaking-news", "world", "nation"],
  loading: true,
  selectedCountry: { label: "India", value: "in" },
  selectedLanguage:{ label: "English", value: "en" },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_LANG:
      return { ...state, lang: action.payload };
    case TYPES.GET_COUNTRIES:
      return { ...state, countries: action.payload };
    case TYPES.GET_TOPICS:
      return { ...state, topics: action.payload };
    case TYPES.SELECTED_MENU:
      return { ...state, selected: action.payload };
    case TYPES.REMOVE_SELECTED_MENU:
      return { ...state, selected: null };
    case TYPES.SET_LOADING:
      return { ...state, loading: true };
    case TYPES.REMOVE_LOADING:
      return { ...state, loading: false };
    case TYPES.REMOVE_SELECTED_COUNTRY:
      return{...state,selectedCountry:null};
    case TYPES.SELECTED_COUNTRY:
      return{...state, selectedCountry:action.payload}  
    case TYPES.REMOVE_SELECTED_LANGUAGE:
      return{...state,selectedLanguage:null};
    case TYPES.SELECTED_LANGUAGE:
      return{...state, selectedLanguage:action.payload}  
    default:
      return state;
  }
};
