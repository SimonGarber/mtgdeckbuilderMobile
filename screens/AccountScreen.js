import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { View, Text, StyleSheet, Button } from "react-native";

const AccountScreen = () => {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center"
  }
});

export default AccountScreen;
