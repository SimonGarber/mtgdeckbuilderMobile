import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import { Context } from "../context/CardsContext";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

import CardItem from "../components/CardItem";
const ShowScreen = props => {
  const { state, addCard } = useContext(Context);

  const UserCard = state.find(
    card => card.id === props.navigation.getParam("id")
  );
  const card = {
    id: props.navigation.getParam("id"),
    name: props.navigation.getParam("name"),
    image: props.navigation.getParam("image")
  };
  return (
    <View>
      <CardItem image={!UserCard ? card.image : UserCard.image} />
      {!UserCard ? (
        <Button
          title="Save Card to collection"
          onPress={() => addCard(card.name, card.image)}
        />
      ) : (
        <Button title="Remove Card from Collection" />
      )}
      <Button
        title="Return to Collection"
        onPress={() => props.navigation.navigate("SavedCards")}
      />
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Card",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName={Platform.OS === "android" ? "md-home" : "ios-home"}
          onPress={() => navigation.navigate("CardSearch")}
        />
      </HeaderButtons>
    ),
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

const styles = StyleSheet.create({});
export default ShowScreen;