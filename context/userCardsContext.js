import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const cardsReducer = (state, action) => {
  switch (action.type) {
    case "get_cards":
      return action.cards;
    case "remove_card":
      return { ...state.filter(card => card.id !== action.cards.id) };
    default:
      return state;
  }
};

const getCards = dispatch => {
  return () => {
    jsonServer
      .get("/usercards")
      .then(response => {
        dispatch({
          type: "get_cards",
          cards: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const addCard = dispatch => {
  return ({ name, image, id }) => {
    jsonServer
      .post("/usercards", { name, image, id })
      .then(response => {
        dispatch({
          type: "add_card",
          cards: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const removeCard = dispatch => async ({ id }) => {
  try {
    const response = await jsonServer.delete(`/usercards/${id}`);
    dispatch({
      type: "remove_card",
      cards: response.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  cardsReducer,
  { getCards, addCard, removeCard },
  []
);
