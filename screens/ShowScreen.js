import React, { useContext } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Context } from "../context/CardsContext";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const ShowScreen = ({ navigation }) => {
  console.log(navigation);
  const { state } = useContext(Context);

  const card = state.find(card => card.id === navigation.getParam("id"));
  return (
    <View>
      <Text>{card.name}</Text>
      <Text>{card.content}</Text>
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
          iconName={Platform.OS === "android" ? "md-build" : "ios-build"}
          onPress={() => {
            navigation.navigate("EditCard", {
              id: navigation.getParam("id"),
              name: navigation.getParam("name"),
              content: navigation.getParam("content")
            });
          }}
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
