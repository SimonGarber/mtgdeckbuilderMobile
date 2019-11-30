import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
const UserCardsScreen = props => (
  <View style={styles.screen}>
    <Text>UserCardsScreen</Text>
  </View>
);
UserCardsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Cards",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
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
export default UserCardsScreen;
