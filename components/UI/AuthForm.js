import React, { useState } from "react";
import { Button, Text, StyleSheet, TextInput } from "react-native";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <React.Fragment>
      <Text style={styles.title}>{headerText}</Text>

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <Button
        style={styles.button}
        title={submitButtonText}
        onPress={() => onSubmit({ email, password })}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15
  },
  title: {
    fontSize: 24,
    margin: 15
  },
  input: {
    margin: 10,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 5
  },
  button: {
    textDecorationColor: "white"
  }
});
export default AuthForm;
