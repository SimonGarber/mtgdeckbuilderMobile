import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Button,
  Image,
  SafeAreaView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Context as userCardsContext } from "../context/userCardsContext";
import { Context as AuthContext } from "../context/AuthContext";

const ShowUserCardScreen = ({ navigation }) => {
  const { getCards } = useContext(userCardsContext);
  const { state } = useContext(AuthContext);
  const userId = state.userId;
  const image = navigation.getParam("image");

  useEffect(() => {
    getCards({ userId });
  }, []);

  return (
    <React.Fragment>
      <NavigationEvents onWillFocus={() => getCards({ userId })} />
      <SafeAreaView>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.buttonContainer}>
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
