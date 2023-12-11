import React from "react";
import Header from "../Common/Header.jsx";
// import Sun from "./images/Sun.svg?react";
// import Moon  from "./images/Moon.svg?react";
import "./styles/DarkMode.css";
import "../Small.css";
import "../Large.css";
// import Header from "../Common/Header.jsx";

const SettingsPage = () => {
    
        const setDarkMode = () => 
        {
            document.querySelector("body").setAttribute('data-theme', 'dark')
        };
        const setLightMode = () => 
        {
            document.querySelector("body").setAttribute('data-theme', 'light')
        };
        const toggleTheme = e =>
        {
            if(e.target.checked) setDarkMode();
            else setLightMode();
        };
    return (
        <div className='dark_mode'>
            <Header />
            <section className="settings-section">
                <h1>Settings</h1>
                <input
                    className='dark_mode_input'
                    type='checkbox'
                    id='darkmode-toggle'
                    onChange={toggleTheme}
                />
                <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                    <img id="sun" src='/settingsIcons/Sun.svg' alt="Sun"/>
                    <img id="moon" src='/settingsIcons/Moon.svg' alt="Moon"/>
                </label>
            </section>

            {/*
             <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
             */}
        </div>
    );
};
   
export default SettingsPage;