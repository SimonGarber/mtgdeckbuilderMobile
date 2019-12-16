import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/UI/AuthForm";
import NavLink from "../components/UI/NavLink";
import { NavigationEvents } from "react-navigation";
const SignUpScreen = () => {
  const { state, signUp, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.centered}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Create an account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        routeName="SignIn"
        text=" Already have an account ? Sign in instead"
      />
    </View>
  );
};
SignUpScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250
  }
});
export default SignUpScreen;
