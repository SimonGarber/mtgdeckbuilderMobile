import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import NavigationContainer from "./navigation/NavigationContainer";
import { Provider as CardsProvider } from "./context/CardsContext";
import { Provider as SearchProvider } from "./context/SearchContext";

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
    <CardsProvider>
      <SearchProvider>
        <NavigationContainer />
      </SearchProvider>
    </CardsProvider>
  );
}
