import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import mtgApi from "../api/mtgApi";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return {
        errorMessage: "",
        token: action.payload.token,
        userId: action.payload.userId
      };
    case "signout":
      return { token: null, errorMessage: "", userId: null };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  let token = await AsyncStorage.getItem("token");
  let userId = await AsyncStorage.getItem("userId");
  if (token) {
    dispatch({ type: "signin", payload: { token: token, userId: userId } });
    navigate("SavedCards");
  } else {
    navigate("SignIn");
  }
};
const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signUp = dispatch => async ({ email, password }) => {
  try {
    const response = await mtgApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("userId", response.data.userId);
    dispatch({
      type: "signin",
      payload: { token: response.data.token, userId: response.data.userId }
    });

    navigate("CardSearch");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    });
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    const response = await mtgApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("userId", response.data.userId);
    dispatch({
      type: "signin",
      payload: { token: response.data.token, userId: response.data.userId }
    });

    navigate("SavedCards");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in"
    });
  }
};

const signOut = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("userId");
  dispatch({ type: "signout" });
  navigate("SignIn");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearErrorMessage, tryLocalSignin },
  {
    token: null,
    errorMessage: "",
    userId: null
  }
);
