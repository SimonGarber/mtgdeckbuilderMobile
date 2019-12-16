import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/UI/AuthForm";
import NavLink from "../components/UI/NavLink";

const SignInScreen = () => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.centered}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign into your account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign in"
        onSubmit={signIn}
      />

      <NavLink
        routeName="SignUp"
        text="Don't have an account ? Register instead"
      />
    </View>
  );
};

SignInScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});
export default SignInScreen;
