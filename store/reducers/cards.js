// import { SET_CARDS } from "../actions/cards";
import CARDS from "../../data/test-data";
import { SET_CARDS } from "../actions/cards";
const initialState = {
  userCards: CARDS
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARDS:
  }
  return state;
};
