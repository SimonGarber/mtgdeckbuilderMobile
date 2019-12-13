import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const searchReducer = (state, action) => {
  switch (action.type) {
    case "get_results":
      return action.payload;
    default:
      return state;
  }
};

const getResults = dispatch => {
  return async () => {
    const response = await jsonServer.get("/userCards");
    dispatch({ type: "get_results", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  searchReducer,
  {
    getResults
  },
  []
);
