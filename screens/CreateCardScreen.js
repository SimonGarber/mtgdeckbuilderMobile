import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { Context } from "../context/CardsContext";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import CardForm from "../components/UI/CardForm";
const CreateCardScreen = ({ navigation }) => {
  const { addCard } = useContext(Context);
  return (
    <CardForm
      onSubmit={(name, content) => {
        addCard(name, content, () => navigation.pop());
      }}
    />
  );
};
CreateCardScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Create Card",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Home"
          iconName={Platform.OS === "android" ? "md-home" : "ios-home"}
          onPress={() => {
            navigation.navigate("SavedCards");
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
export default CreateCardScreen;
