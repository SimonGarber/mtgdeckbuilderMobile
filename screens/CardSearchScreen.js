import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TextInput,
  Button,
  FlatList
} from "react-native";
import { useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const CardSearchScreen = props => {
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const result = useSelector(state => state.cards.userCards);
  const setTextHandler = value => {
    setText(value);
  };
  const setSearchHandler = () => {
    setIsSubmitted(true);
  };
  const resetSearchHandler = () => {
    setIsSubmitted(false);
    setText("");
  };
  return !isSubmitted ? (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter search term here"
          style={{ height: 40 }}
          value={text}
          onChangeText={setTextHandler}
        />
        <Button title="Submit Search" onPress={setSearchHandler} />
      </View>
    </View>
  ) : (
    <React.Fragment>
      <Button title="Reset Search" onPress={resetSearchHandler} />
      <FlatList
        data={result}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CardItem
            image={item.imageUrl}
            title={item.name}
            description={item.description}
          />
        )}
      />
    </React.Fragment>
  );
};

CardSearchScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Search",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
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
  },
  inputContainer: {
    height: 40,
    width: "40%"
  }
});
export default CardSearchScreen;
