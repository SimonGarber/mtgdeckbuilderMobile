import React, { useContext } from "react";
import { View, StyleSheet, Platform, Button, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Context as userCardsContext } from "../context/userCardsContext";
// import CardItem from "../components/CardItem";

const ShowSearchCardScreen = ({ navigation }) => {
  const { state, addCard } = useContext(userCardsContext);
  const id = navigation.getParam("id");
  const name = navigation.getParam("name");
  const image = navigation.getParam("image");
  const userId = navigation.getParam("userId");

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.buttonContainer}>
        <Button
          title="Go Back"
          onPress={() => {
            navigation.navigate("CardSearch");
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Card to Collection"
          onPress={() => addCard({ name, image, id })}
        />
      </View>
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
export default ShowSearchCardScreen;
