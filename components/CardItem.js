import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
// import Card from "../components/UI/Card";

const CardItem = ({ navigation, image, name, id, userId, styleProps }) => {
  return (
    <View style={{ ...styles.card, styleProps }}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text>{userId}</Text>
    </View>
  );
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
export default CardItem;
