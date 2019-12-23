import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Platform, Button, Image, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Context as userCardsContext } from "../context/userCardsContext";
import { NavigationEvents } from "react-navigation";
import mtgApi from "../api/mtgApi";
import jsonServer from "../api/jsonServer";
import searchedArray from "../helpers/checkResult";

const ShowSearchCardScreen = ({ navigation }) => {
  const { state, addCard, getCards } = useContext(userCardsContext);
  const [inCollection, setIncollection] = useState(false);
  const id = navigation.getParam("id");
  const name = navigation.getParam("name");
  const image = navigation.getParam("image");
  const userId = navigation.getParam("userId");

  // Helper function to alert users as to what cards they search are already in their collection

  const checkResult = () => {
    console.log("Checking Result...");
    const show = state.showCard;
    const collection = state.cards;
    const showCardId = show["id"];

    const result = searchedArray(showCardId, collection);
    if (result) {
      setIncollection(true);
    }
  };

  const saveCardHandler = async () => {
    await addCard({ userId, id, name, image });
  };

  // Hook that runs on component rendering that runs the helper function once
  useEffect(() => {
    checkResult();
  }, []);

  return (
    <View style={styles.card}>
      <NavigationEvents
        onWillFocus={() => {
          checkResult();
        }}
      />
      <Image style={styles.image} source={{ uri: image }} />

      {!inCollection ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Save Card to Collection"
            onPress={() => saveCardHandler()}
          />
        </View>
      ) : (
        <Text>In Collection</Text>
      )}
    </View>
  );
};

ShowSearchCardScreen.navigationOptions = ({ navigation }) => {
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
export default ShowSearchCardScreen;
