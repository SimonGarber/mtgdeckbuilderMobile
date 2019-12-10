import jsonServer from "../../api/jsonServer";
import store from "../store";

export const getApiData = () => {};

export const setUserData = dispatch => {
  return async () => {
    const response = await jsonServer.get("/searchResults");
    dispatch({ type: "SET_USER_CARDS", payload: response.data });
  };
};
