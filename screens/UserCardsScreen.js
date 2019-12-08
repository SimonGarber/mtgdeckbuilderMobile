import React from "react";
import { StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import CardItem from "../components/CardItem";
import { useSelector } from "react-redux";

const UserCardsScreen = props => {
  const cards = useSelector(state => state.cards.userCards);
  return (
    <FlatList
      data={cards}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <CardItem
          image={item.imageUrl}
          title={item.name}
          description={item.description}
        />
      )}
    />
  );
};
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
