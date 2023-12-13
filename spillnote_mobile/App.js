
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Nav from "./Components/Nav";
import Explore from "./Components/Explore";
import LoginPage from "./Components/loginPageMobile";
import RegisterPage from "./Components/regPageMobile";
import SettingsMobile from "./Components/SettingsMobile";
import RichTextEditor from "./Components/noteCreate"
const navigator = createStackNavigator(
  {
    Home: Nav,
    Explore: Explore,
    LoginPage: LoginPage,
    RegisterPage: RegisterPage,
    SettingsMobile: SettingsMobile,
    Create: RichTextEditor,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Spillnote",
      headerStyle: {
        backgroundColor: "#3f4966",
      },
      headerTintColor: "white", 
    },
  }
);
const AppContainer = createAppContainer(navigator);

const App = () => {
  return <AppContainer />;
};

export default App;
