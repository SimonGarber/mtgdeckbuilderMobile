import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import App from "./navigation/AppNavigator";
// import { Provider as CardsProvider } from "./context/CardsContext";

import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as UserCardsProvider } from "./context/userCardsContext";
import { setNavigator } from "./navigationRef";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default () => {
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
    <AuthProvider>
      <UserCardsProvider>
        <App
          ref={navigator => {
            setNavigator(navigator);
          }}
        />
      </UserCardsProvider>
    </AuthProvider>
  );
};
