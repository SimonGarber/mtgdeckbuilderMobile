import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as UserCardsContext } from "../context/userCardsContext";
import { View, Text, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
const AccountScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <Text>Account Screen</Text>
      <View>
        <Button title="Logout" onPress={signOut} />
      </View>
    </View>
  );
};
AccountScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Accounts",
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
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AccountScreen;
