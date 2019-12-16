import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.signIn}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  signIn: {
    textAlign: "center",
    color: "blue"
  }
});
export default withNavigation(NavLink);
