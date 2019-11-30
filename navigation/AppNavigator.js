import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";
import UserCardsScreen from "../screens/UserCardsScreen";
import CardSearchScreen from "../screens/CardSearchScreen";
import MainAppScreen from "../screens/MainAppScreen";
import { Platform, View, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "white"
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : colors.primary
};
const SearchNavigator = createStackNavigator(
  {
    CardSearch: CardSearchScreen,
    SavedCards: UserCardsScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={
            Platform.OS === "android" ? "md-paper-plane" : "ios-paper-plane"
          }
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const CardsNavigator = createStackNavigator(
  {
    SavedCards: UserCardsScreen,
    CardSearch: CardSearchScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
const AppNavigator = createDrawerNavigator(
  {
    Search: SearchNavigator,
    Cards: CardsNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.primary
    },
    contentComponent: props => {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
          </SafeAreaView>
        </View>
      );
    }
  }
);
const MainNavigator = createSwitchNavigator({
  StartUp: MainAppScreen,
  App: AppNavigator
});
export default createAppContainer(MainNavigator);
