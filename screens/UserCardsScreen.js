import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Platform,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
// import { Feather } from "@expo/vector-icons";
import { Context as UserCardsContext } from "../context/userCardsContext";
import { Context as AuthContext } from "../context/AuthContext";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { NavigationEvents } from "react-navigation";
import jsonServer from "../api/jsonServer";

const UserCardsScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const userCards = useContext(UserCardsContext);
  const { getCards, getCard, removeCard } = useContext(UserCardsContext);
  const userId = state.userId;
  console.log(" state inside userCardsScreen=>", userCards.state);
  console.log("Auth State =>", state);

  const showUserCard = async ({ item }) => {
    getCard({ item });
  };

  useEffect(() => {
    getCards({ userId });
  }, []);
  return (
    <View>
      <NavigationEvents onWillFocus={() => getCards({ userId })} />
      <FlatList
        data={userCards.state.cards}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <TouchableOpacity onPress={() => showUserCard({ item })}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <View>
                <Button
                  title="Delete"
                  onPress={() => removeCard({ state, item })}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => Math.floor(Math.random() * 9999999).toString()}
      />
    </View>
  );
};
// {state.map(card => {
//   return (
//     <Button
//       title={`${card.name}`}
//       key={card.id}
//       onPress={() =>
//         navigation.navigate("ShowUserCard", {
//           id: card.id,
//           userId: card.userId,
//           image: card.image,
//           name: card.name
//         })
//       }
//     />
//   );
// })}
// return <React.Fragment></React.Fragment>;

UserCardsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Collection",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Create"
          iconName={Platform.OS === "android" ? "md-home" : "ios-home"}
          onPress={() => {
            navigation.navigate("AccountScreen");
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
