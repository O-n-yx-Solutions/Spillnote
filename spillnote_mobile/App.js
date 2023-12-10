import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
// import Nav from "./Components/Nav";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { TouchableOpacity, Text } from "react-native";

import Nav from "./Components/Nav";
import Explore from "./Components/Explore";
import LoginPage from "./Components/loginPageMobile";
import RegisterPage from "./Components/regPageMobile";
import DrawingScreen from "./Components/DrawingScreen";
const navigator = createStackNavigator(
  {
    Home: Nav,
    Explore: Explore,
    LoginPage: LoginPage,
    RegisterPage: RegisterPage,
    DrawingScreen: DrawingScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
      headerStyle: {
        backgroundColor: "#3f4966", // Background color for the header
      },
      headerTintColor: "white", // Text color for the header
    },
  }
);
const AppContainer = createAppContainer(navigator);

const App = () => {
  return <AppContainer />;
};

export default App;
