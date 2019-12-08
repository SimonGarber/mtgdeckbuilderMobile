import Card from "../../models/card";

export const SET_CARDS = "SET_CARDS";

export const fetchUserCards = () => {
  return (dispatch, getState) => {
    const cards = getState.cards.userCards;
  };
};
