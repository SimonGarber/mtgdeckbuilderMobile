import React, { useContext, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Context as CardsContext } from "../context/CardsContext";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const UserCardsScreen = ({ navigation }) => {
  const { state, deleteCard, getCards } = useContext(CardsContext);

  useEffect(() => {
    getCards();
    //allows for refetching the data from the api once an CRUD action has been performed
    const listener = navigation.addListener("didFocus", () => {
      getCards();
    });
    return () => {
      // clean up function to remove any active listeners when the component becomes unmounted
      listener.remove();
    };
  }, []);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={card => card.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("ShowCard", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity onPress={() => deleteCard(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
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
