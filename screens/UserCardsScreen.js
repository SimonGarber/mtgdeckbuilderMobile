import React, { useEffect, useContext } from "react";
import { StyleSheet, Platform, Button } from "react-native";
// import { Feather } from "@expo/vector-icons";
import { Context as UserCardsContext } from "../context/userCardsContext";
// import { Context as AuthContext } from "../context/AuthContext";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { NavigationEvents } from "react-navigation";

const UserCardsScreen = ({ navigation }) => {
  const { state, getCards } = useContext(UserCardsContext);

  useEffect(() => {
    getCards();
  }, []);

  return (
    <React.Fragment>
      <NavigationEvents onWillFocus={() => getCards()} />
      {state.map(card => {
        return (
          <Button
            title={`${card.name}`}
            key={card.id}
            onPress={() =>
              navigation.navigate("ShowUserCard", {
                id: card.id,
                userId: card.userId,
                image: card.image,
                name: card.name
              })
            }
          />
        );
      })}
    </React.Fragment>
  );
};

UserCardsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Collection",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create"
          iconName={Platform.OS === "android" ? "md-home" : "ios-home"}
          onPress={() => {
            navigation.goBack();
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
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: "gray"
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
});

export default UserCardsScreen;
