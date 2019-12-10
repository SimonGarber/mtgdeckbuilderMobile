import React from "react";
import { StyleSheet, Platform, View, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
// import CardItem from "../components/CardItem";

const UserCardsScreen = props => {
  return (
    <View style={styles.screen}>
      <View>
        <Button title="Load Cards" />
      </View>
    </View>
  );
};

UserCardsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Cards",
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

export default UserCardsScreen;
