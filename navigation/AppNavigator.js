import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import {
//   createDrawerNavigator,
//   DrawerNavigatorItems
// } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import UserCardsScreen from "../screens/UserCardsScreen";
import CardSearchScreen from "../screens/CardSearchScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import ShowUserCardScreen from "../screens/ShowUserCardScreen";
import ShowSearchCardScreen from "../screens/ShowSearchCardScreen";
import LoadingScreen from "../screens/LoadingScreen";
import AccountScreen from "../screens/AccountScreen";
// import { Platform, View, SafeAreaView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import colors from "../constants/colors";

// const defaultNavOptions = {
//   headerStyle: {
//     backgroundColor: Platform.OS === "android" ? colors.primary : "white"
//   },
//   headerTitleStyle: {
//     fontFamily: "open-sans-bold"
//   },
//   headerBackTitleStyle: {
//     fontFamily: "open-sans"
//   },
//   headerTintColor: Platform.OS === "android" ? "white" : colors.primary
// };
// const CardsNavigator = createStackNavigator(
//   {
//     SavedCards: UserCardsScreen,

//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={
//             Platform.OS === "android" ? "md-paper-plane" : "ios-paper-plane"
//           }
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

// const SearchNavigator = createStackNavigator(
//   {
//     CardSearch: CardSearchScreen,
//     ,
//     SavedCards: UserCardsScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-list" : "ios-list"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );
// const drawerNavigator = createDrawerNavigator(
//   {
//     Collection: CardsNavigator,
//     Search: SearchNavigator,
//     Account: AccountScreen
//   },
//   {
//     contentOptions: {
//       activeTintColor: colors.primary
//     },
//     contentComponent: props => {
//       return (
//         <View style={{ flex: 1, padding: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerNavigatorItems {...props} />
//           </SafeAreaView>
//         </View>
//       );
//     }
//   }
// );
const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Loading: LoadingScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    search: createStackNavigator({
      CardSearch: CardSearchScreen,
      ShowSearchCard: ShowSearchCardScreen
    }),
    Account: AccountScreen,
    collection: createStackNavigator({
      SavedCards: UserCardsScreen,
      ShowUserCard: ShowUserCardScreen
    })
  })
});
const App = createAppContainer(switchNavigator);

export default App;
