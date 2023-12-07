import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
// import Nav from "./Components/Nav";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Nav from "./Components/Nav";
import Explore from "./Components/Explore";
import LoginPage from "./Components/loginPageMobile";
import RegisterPage from "./Components/regPageMobile";

const navigator = createStackNavigator(
  {
    Home: Nav,
    Explore: Explore,
    LoginPage: LoginPage,
    RegisterPage: RegisterPage,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
