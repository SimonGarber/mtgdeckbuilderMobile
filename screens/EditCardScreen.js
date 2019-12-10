import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";
import { Context } from "../context/CardsContext";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import CardForm from "../components/UI/CardForm";
const EditCardScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state, editCard } = useContext(Context);
  const card = state.find(card => card.id === id);

  return (
    <CardForm
      initialValues={{ name: card.name, content: card.content }}
      onSubmit={(name, content) => {
        editCard(id, name, content, () => navigation.pop());
      }}
    />
  );
};

EditCardScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Edit Card",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save Card"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => {
            navigation.navigate("CardSearch");
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
export default EditCardScreen;
