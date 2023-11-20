import "./App.css";
import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { onSnapshot, collection } from "firebase/firestore";
import "./App.css";
import getFirestore from "./Firebase";
import { handleEdit, handleNew, handleDelete, handleQueryDelete } from "./util";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import RegisterPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Nav from "./Components/Nav.jsx";
import Choices from "./Choices";
import SettingsPage from "./Components/SettingsPage";
import Explore from "./Explore";
import RegUser from "./Components/scripts/RegUser.js";
import Credit from "./Create.jsx";
import AcctPage from "./Components/AcctPage.jsx";
// import Nav from "./Nav";
// import SettingsPage from "./Components/settingsPage.jsx";
// import Explore from "./Explore";

function App() {
  const [action, setAction] = useState(" ");

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    setAction(params.get("action"));
  }, []);

  switch (action) {
    case "nav":
      return <Nav />;
      break;
    case "create":
      return <Create />;
      break;
    case "login_page":
      return <LoginPage />;

    case "reg_page":
      return <RegisterPage />;

    case "settings_page":
      return <SettingsPage />;

    case "explore_link":
      return <Explore />;

    case "reg_user":
      RegUser();
      return <Choices />;

    case "acct_page":
      return <AcctPage />;

    case "acct_page":
      return <AcctPage />;

    default:
      return <Nav />;
    //Credit noteid={null} /</>
  }
}

//for testing database interactions
export default App;
