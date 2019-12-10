import { combineReducers } from "redux";
import cardsReducer from "../reducers/cards";
import dataReducer from "../reducers/data";

export default combineReducers({
  cardsReducer,
  dataReducer
});
