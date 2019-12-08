import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import NavigationContainer from "./navigation/NavigationContainer";
import ReduxThunk from "redux-thunk";
import cardsReducer from "./store/reducers/cards";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  cards: cardsReducer
});
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
