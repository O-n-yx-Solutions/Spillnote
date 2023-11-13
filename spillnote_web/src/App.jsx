//import { onSnapshot, collection } from "firebase/firestore";
import "./App.css";
//import getFirestore from "./Firebase";
import { useEffect, useState } from "react";
// import { handleEdit, handleNew, handleDelete, handleQueryDelete } from "./util";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import RegisterPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Choices from "./Choices";
import SettingsPage from "./Components/SettingsPage";
import Explore from "./Explore";
import RegUser from "./Components/scripts/RegUser.js"
// import Nav from "./Nav";
// import SettingsPage from "./Components/settingsPage.jsx";
// import Explore from "./Explore";


function App() 
{
  const [action, setAction] = useState(' ');

  useEffect(( ) => 
  {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    setAction(params.get('action'));

  }, [ ]);
  
  switch (action) {
    case "login_page":
      return <LoginPage />;

    case "reg_page":
      return <RegisterPage />;

    case "settings_page":
      return <SettingsPage />
    
    case "explore_link":
      return < Explore/>

    case "reg_user":
        RegUser();
        return <Choices />

    default:
      return <Choices />
      
  }
}

/*function App() {
  const [notes, setNotes] = useState([
    { class: "Fetching Notes", id: "initial" },
  ]);
  console.log(notes);
  useEffect(
    () =>
      onSnapshot(collection(getFirestore, "notes"), (snapshot) =>
        setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className="root">
      <button className="className" onClick={handleNew}>
        Submit
      </button>
      <button className="className" onClick={handleQueryDelete}>
        Delete
      </button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <textarea
              onClick={() => handleEdit(note.id)}
              cols="20"
              rows="15"
              placeholder={note.class}
            ></textarea>
            <a onClick={() => handleEdit(note.id)}>Edit</a>
            <button className="delete" onClick={() => handleDelete(note.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/
//for testing database interactions
export default App;
