import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";
// import mtgApi from "../api/mtgApi";
import { navigate } from "../navigationRef";
const cardsReducer = (state, action) => {
  switch (action.type) {
    case "remove_card":
      return {
        ...state,
        ...state.cards.filter(card => card.id !== action.payload.deletedCard)
      };
    case "add_card":
      return {
        ...state,
        ...state.cards.filter(card => card.id === action.payload)
      };

    case "get_cards":
      return { ...state, cards: action.payload };
    case "get_card":
      return { ...state, showCard: action.payload };

    default:
      return state;
  }
};

const getCards = dispatch => async ({ userId }) => {
  console.log("Getting User Cards");
  try {
    const response = await jsonServer.get(`/api/v1/users/${userId}`);

    dispatch({
      type: "get_cards",
      payload: response.data.data
    });
  } catch (err) {
    console.log("Error in Get Cards =>", err);
  }
};
const getCard = dispatch => async ({ item }) => {
  try {
    const response = await jsonServer.get(`/api/v1/cards/${item.id}`);
    if (!response.data) {
      return;
    }
    dispatch({
      type: "get_card",
      payload: {
        id: response.data.data.id,
        name: response.data.data.name,
        image: response.data.data.image_uris.small
      }
    });

    navigate("ShowUserCard", {
      id: item.id,
      name: item.name,
      image: item.image
    });
  } catch (err) {
    console.log("Error Showing Card =>", err.message);
  }
};

const getSearchCard = dispatch => async ({ item }) => {
  dispatch({
    type: "get_card",
    payload: {
      id: item.id,
      name: item.name,
      image: item.image,
      userId: item.userId
    }
  });
  navigate("ShowSearchCard", {
    id: item.id,
    name: item.name,
    image: item.image,
    userId: item.userId
  });
};

const addCard = dispatch => async ({ userId, id, name, image }) => {
  try {
    const response = await jsonServer.put(`/api/v1/users/${userId}`, {
      card: { id: id, name: name, image: image }
    });
    if (!response.data) {
    }
    dispatch({
      type: "add_card",
      payload: response.data
    });
    dispatch({
      type: "get_card",
      payload: {
        id: id,
        name: name,
        image: image
      }
    });
    navigate("ShowUserCard", {
      id: id,
      name: name,
      image: image
    });
  } catch (err) {
    console.log("Error in Add_Card =>", err);
  }
};

const removeCard = dispatch => async ({ state, item }) => {
  const { userId } = state;
  try {
    const response = await jsonServer.put(
      `/api/v1/users/cards/delete/${userId}`,
      {
        card: { id: item.id }
      }
    );
    if (!response) {
      console.log("Error!?!?");
    }
    dispatch({
      type: "remove_card",
      payload: {
        userCards: response.data.data.cards,
        deletedCard: item.id
      }
    });
    dispatch({
      type: "get_cards",
      payload: response.data.data.cards
    });
  } catch (err) {
    console.log("Error in Remove Card =>", err.message);
  }
};

export const { Context, Provider } = createDataContext(
  cardsReducer,
  { removeCard, addCard, getCards, getCard, getSearchCard },
  { cards: [], showCard: {} }
);
