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
import { Context } from "../context/CardsContext";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const CardSearchScreen = ({ navigation }) => {
  const { state, deleteCard, getCards } = useContext(Context);

  useEffect(() => {
    getCards();

    const listener = navigation.addListener("didFocus", () => {
      getCards();
    });
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={card => card.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("ShowCard", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.name} - {item.id}
                </Text>
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

CardSearchScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Search",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create"
          iconName={Platform.OS === "android" ? "md-brush" : "ios-brush"}
          onPress={() => {
            navigation.navigate("CreateCard");
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

export default CardSearchScreen;
