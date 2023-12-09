import "./Small.css";
import "./Large.css";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import TextEditor from "./TextEditor.jsx";
//import getFirestore from "./Firebase";
import { handleEdit, handleNew, handleDelete, handleQueryDelete } from "./util";
import RegisterPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Nav from "./Components/Nav.jsx";
import Choices from "./Choices";
import Explore from "./Explore";
import RegUser from "./Components/scripts/RegUser.js";
import Credit from "./Credit.jsx";
import AcctPage from "./Components/AcctPage.jsx";
import SettingsPage from "./Components/settingsPage.jsx";

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
      return <TextEditor />;
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

    case "recent_link":

    case "fav_link":

    default:
      return <Explore />;
  }
}

//for testing database interactions
export default App;
