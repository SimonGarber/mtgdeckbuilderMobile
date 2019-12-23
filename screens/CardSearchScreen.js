import React from "react";
import { StyleSheet, View } from "react-native";

import SearchForm from "../components/UI/SearchForm";
// import { Context as AuthContext } from "../context/AuthContext";
// import { Context as userCardsContext } from "../context/userCardsContext";
const CardSearchScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <SearchForm navigation={navigation} />
    </View>
  );
};

CardSearchScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Find Cards"
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CardSearchScreen;
