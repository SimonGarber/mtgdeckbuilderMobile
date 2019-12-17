import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Button,
  Image,
  SafeAreaView
} from "react-native";
import CardItem from "../components/CardItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Context as userCardsContext } from "../context/userCardsContext";

const ShowUserCardScreen = ({ navigation }) => {
  const { state, removeCard } = useContext(userCardsContext);
  // All the Card data that is passed into this component
  const id = navigation.getParam("id");
  const name = navigation.getParam("name");
  const image = navigation.getParam("image");
  const userId = navigation.getParam("userId");
  const removeCardHandler = () => {
    removeCard({ id });
  };
  const transition = () => {
    navigation.navigate("SavedCards");
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.buttonContainer}>
            <Button
              title="Go Back"
              onPress={() => {
                navigation.navigate("SavedCards");
              }}
            />

            <Button
              title="Remove Card from Collection"
              onPress={() => setTimeout(transition, 2000, removeCardHandler)}
            />
            <Button
              title="Add to Deck"
              onPress={() => navigation.setParams({ name: "new Title" })}
            />
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

ShowUserCardScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("name"),
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

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 500,
    margin: 20
  },
  image: {
    width: "100%",
    height: "100%"
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  description: {
    fontSize: 14
  },
  buttonContainer: {
    height: "10%"
  }
});
export default ShowUserCardScreen;
