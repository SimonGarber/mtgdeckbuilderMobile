import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const cardReducer = (state, action) => {
  switch (action.type) {
    case "edit_card":
      return state.map(card => {
        return card.id === action.payload.id ? action.payload : card;
      });

    case "delete_card":
      return state.filter(card => card.id !== action.payload);
    case "get_cards":
      return action.payload;

    default:
      return state;
  }
};

// action creators for CRUD operations
const addCard = () => {
  return async (name, image, callback) => {
    await jsonServer.post("/usercards", { name, image });

    if (callback) {
      callback();
    }
  };
};

const deleteCard = dispatch => {
  return async id => {
    await jsonServer.delete(`/usercards/${id}`);
    dispatch({ type: "delete_card", payload: id });
  };
};

const editCard = dispatch => {
  return async (id, name, content, callback) => {
    await jsonServer.put(`/usercards/${id}`, { name, content });
    dispatch({
      type: "edit_card",
      payload: { id, name, content }
    });
    if (callback) {
      callback();
    }
  };
};
const getCards = dispatch => {
  return async () => {
    const response = await jsonServer.get("/usercards");
    dispatch({ type: "get_cards", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  cardReducer,
  { addCard, deleteCard, editCard, getCards },
  []
);
