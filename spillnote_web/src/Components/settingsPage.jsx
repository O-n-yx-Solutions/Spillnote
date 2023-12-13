import React from "react";
import Nav from "./Nav";
import "./styles/DarkMode.css";

const SettingsPage = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <div className="dark_mode">
        <h1>Settings</h1>
        <input
          className="dark_mode_input"
          type="checkbox"
          id="darkmode-toggle"
          onChange={toggleTheme}
        />
        <label className="dark_mode_label" htmlFor="darkmode-toggle">
          <img id="sun" src="/settingsIcons/Sun.svg" alt="Sun" />
          <img id="moon" src="/settingsIcons/Moon.svg" alt="Moon" />
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
