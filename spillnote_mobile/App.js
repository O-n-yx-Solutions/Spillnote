import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
// import Nav from "./Components/Nav";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Nav from "./Components/Nav";
import Explore from "./Components/Explore";
import LoginPage from "./Components/loginPageMobile";
import RegisterPage from "./Components/regPageMobile";

<<<<<<< HEAD
export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage />
      <StatusBar style="auto" />
      <Explore />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
=======
const navigator = createStackNavigator(
  {
    Home: Nav,
    Explore: Explore,
    LoginPage: LoginPage,
    RegisterPage: RegisterPage,
>>>>>>> 56ca9f2cc4c6fea3bf52031c6b00dbc956866eec
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
