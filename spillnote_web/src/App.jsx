import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./Components/scripts/NoPage.jsx";
import TextEditor from "./TextEditor.jsx";
import RegisterPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Explore from "./Explore";
import AcctPage from "./Components/AcctPage.jsx";
import SettingsPage from "./Components/settingsPage.jsx";
import Calendar from "./Components/Callender.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="login_page" element={<LoginPage />} />
        <Route path="reg_page" element={<RegisterPage />} />
        <Route path="acct_page" element={<AcctPage />} />
        <Route path="settings_page" element={<SettingsPage />} />
        <Route path="calendar" element={<Calendar />}/>
        <Route path="text_editor" element={<TextEditor />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
