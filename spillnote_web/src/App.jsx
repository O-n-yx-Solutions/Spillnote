import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/scripts/Layout.jsx";
import NoPage from "./Components/scripts/NoPage.jsx";
import TextEditor from "./TextEditor.jsx";
import RegisterPage from "./Components/RegPage";
import LoginPage from "./Components/LoginPage";
import Nav from "./Components/Nav.jsx";
import Choices from "./Choices";
import Explore from "./Explore";
import Credit from "./Credit.jsx";
import AcctPage from "./Components/AcctPage.jsx";
import SettingsPage from "./Components/settingsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="login_page" element={<LoginPage />} />
        <Route path="reg_page" element={<RegisterPage />} />
        <Route path="acct_page" element={<AcctPage />} />
        <Route path="settings_page" element={<SettingsPage />} />
        <Route path="text_editor" element={<TextEditor />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
