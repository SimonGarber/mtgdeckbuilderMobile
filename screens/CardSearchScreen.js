import React, { useContext } from "react";
import { StyleSheet, Platform, View, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import SearchForm from "../components/UI/SearchForm";
import { Context as SearchContext } from "../context/SearchContext";
const CardSearchScreen = ({ navigation }) => {
  const { state } = useContext(SearchContext);
  return (
    <View style={styles.screen}>
      <SearchForm navigation={navigation} />
    </View>
  );
};

CardSearchScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Find Cards",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
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
